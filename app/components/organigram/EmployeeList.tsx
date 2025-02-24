"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";
import { Employees } from "@/app/types/types";
import { useOrgChartStore } from "@/app/store/orgChartStore";

interface EmployeeListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  positionId: number;
}

export default function EmployeeList({
  open,
  onOpenChange,
  positionId,
}: EmployeeListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employees | null>(null);
  const [error, setError] = useState("");
  const { positionById, loadPositionsById } = useOrgChartStore();
  const [localEmployees, setLocalEmployees] = useState(
    positionById.position_assignments
  );

  console.log("ACAAA", positionById, localEmployees);

  useEffect(() => {
    setLocalEmployees(positionById.position_assignments);
  }, [positionById]);

  const handleOpenForm = (employee: Employees | null = null) => {
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
        localEmployees.map((assignment) =>
          assignment.employees.id === currentEmployee.id
            ? {
                ...assignment,
                employees: { ...assignment.employees, full_name: name, email },
              }
            : assignment
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employees = {
        id: localEmployees.length + 1,
        full_name: name,
        email,
      };
      setLocalEmployees([
        ...localEmployees,
        { id: newEmployee.id, employees: newEmployee },
      ]);
    }

    handleCloseForm();
  };

  const handleDelete = (id: number) => {
    setLocalEmployees(
      localEmployees.filter((assignment) => assignment.employees.id !== id)
    );
  };

  useEffect(() => {
    loadPositionsById(positionId);
  }, [loadPositionsById, positionId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <SheetTitle className="text-xl font-medium">
                Employees - {`${positionById.name}`}
              </SheetTitle>
            </div>
          </div>
          <div className="text-base">
            <div className="flex justify-between items-center">
              <h2 className="text-muted-foreground">List of employees</h2>
              <Button
                className="bg-[#2930ff] hover:bg-[#2930ff]/90"
                onClick={() => handleOpenForm()}
              >
                New
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-2">
          {localEmployees?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              You have no employees for this position
            </p>
          ) : (
            localEmployees
              ?.filter(
                (assignment) => assignment.employees.id !== currentEmployee?.id
              )
              ?.map((assignment) => {
                const el = assignment.employees;
                console.log("ACAAA3", el);
                return (
                  <div
                    key={el.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group"
                  >
                    <div>
                      <h3 className="font-medium">{el.full_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {el.email}
                      </p>
                    </div>
                    {!isFormOpen && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenForm(el)}
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(el.id)}
                        >
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
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
                defaultValue={currentEmployee?.full_name || ""}
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
