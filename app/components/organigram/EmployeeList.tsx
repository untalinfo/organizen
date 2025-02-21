"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/app/components/ui/sheet";
import { Users, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Employee {
  id: string;
  name: string;
  email: string;
}
interface EmployeeListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function EmployeeList({ open, onOpenChange }: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@empresa.com",
    },
    {
      id: "2",
      name: "María García",
      email: "maria@empresa.com",
    },
  ]);

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
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
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </SheetClose>
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
          {employees.map((employee) => (
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
