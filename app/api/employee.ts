import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "react-toastify";
import { Employees, PositionAssignment } from "../types/types";

export default async function fetchCreateEmployee(data: Employees, positionId: number): Promise<PositionAssignment | null> {
  const { data: employee, error } = await supabase.from('employees').insert(data).select().single();

  if (error) {
    toast.error(`Error creating employee: ${error.message}`);
    return null;
  }
  
  // Asociar el empleado recién creado a una posición
  const { data: position_assignments, error: assignmentError } = await supabase
    .from('position_assignments')
    .insert({ position_id: positionId, employee_id: employee.id }).select().single();

  if (assignmentError) {
    toast.error(`Error assigning position: ${assignmentError.message}`);
    return null;
  }

  toast.success('Employee created and assigned successfully!');
  const position_assignment: PositionAssignment = {
    id: position_assignments.id,
    employees: employee as Employees,
  };
  return position_assignment;
}

export async function fetchDeleteEmployee (position_assignment: PositionAssignment): Promise<void> {
  const { error: assignmentError } = await supabase
    .from('position_assignments')
    .delete().eq('id', position_assignment.id).single();

  if (assignmentError) {
    toast.error(`Error deleting position assigment: ${assignmentError.message}`);
    return;
  }

  const { error: employeeError } = await supabase
    .from('employees')
    .delete().eq('id', position_assignment.employees.id).single();

    if (employeeError) {
    toast.error(`Error deleting employee: ${employeeError.message}`);
    return;
  }

  toast.success('Employee deleted successfully!');
}

export async function fetchEditEmployee(updateData: Employees): Promise<Employees | null> {
  const { id, ...employeeData } = updateData;
  const { data: employee, error } = await supabase
    .from('employees')
    .update({ ...employeeData })
    .eq('id', id)
    .select().single()
          

  if (error) {
    toast.error(`Error updating employee: ${error.message}`);
    return null;
  }

  toast.success('Employee updated successfully!');
  return employee;
}