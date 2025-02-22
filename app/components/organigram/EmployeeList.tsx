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

  useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  const handleDelete = (id: string) => {
    setLocalEmployees(localEmployees.filter((emp) => emp.id !== id));
  };

  console.log("EMPLOYEES", employees, localEmployees);

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
              <Button className="bg-[#2930ff] hover:bg-[#2930ff]/90">
                New
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2">
          {localEmployees.map((employee) => (
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
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon">
                  <Pencil className="w-4 h-4 text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(employee.id)}
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
