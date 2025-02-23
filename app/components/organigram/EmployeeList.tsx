"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import { Users, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";

interface Employee {
  id: string;
  name: string;
  email: string;
}
interface EmployeeListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
}


export default function EmployeeList({ open, onOpenChange, employees }: EmployeeListProps) {
  const [localEmployees, setLocalEmployees] = useState<Employee[]>(employees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  const handleOpenForm = (employee: Employee | null = null) => {
    setCurrentEmployee(employee);
    setIsFormOpen(true);
    setError("");
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentEmployee(null);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (currentEmployee) {
      // Edit existing employee
      setLocalEmployees(
        employees.map((emp) =>
          emp.id === currentEmployee.id ? { ...emp, name, email } : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: (employees.length + 1).toString(),
        name,
        email,
      };
      setLocalEmployees([...employees, newEmployee]);
    }

    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    setLocalEmployees(localEmployees.filter((emp) => emp.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <SheetTitle className="text-xl font-medium">
                Employees - Sellers
              </SheetTitle>
            </div>
          </div>
          <SheetDescription className="text-base">
            <div className="flex justify-between items-center">
              <h2 className="text-muted-foreground">List of employees</h2>
              <Button
                className="bg-[#2930ff] hover:bg-[#2930ff]/90"
                onClick={() => handleOpenForm()}
              >
                New
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2">
          {localEmployees.length === 0 ? (
            <p className="text-center text-muted-foreground">
              You have no employees for this position
            </p>
          ) : (
            localEmployees
              .filter((employee) => employee.id !== currentEmployee?.id)
              .map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group"
                >
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.email}
                    </p>
                  </div>
                  {!isFormOpen && <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenForm(employee)}
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </div>}
                </div>
              ))
          )}
        </div>
        {/* New Employee Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 p-3 bg-gray-50 rounded-md mt-3"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium">
                {currentEmployee ? "Edit Employee" : "New Employee"}
              </h4>
            </div>
            <div className="space-y-2">
              <Input
                name="name"
                placeholder="Employee name"
                defaultValue={currentEmployee?.name || ""}
                required
              />
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  defaultValue={currentEmployee?.email || ""}
                  required
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseForm}
                  className="text-muted-foreground "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#37c99f] hover:bg-[#37c99f]/90 text-white"
                >
                  {currentEmployee ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
