import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "react-toastify";
import { Position } from "../types/types";

export default async function Positions() {
  const { data: positions, error } = await supabase.from('positions').select(
    `id, name, reports_to_id, tier_id,`
  );

  if (error) {
    toast.error(`Error feching positions: ${error.message}`);
  }
  return JSON.stringify(positions, null, 2);
}

export async function fetchEditPosition(data: Partial<Position>): Promise<Position | null> {
  const { data: position, error } = await supabase
    .from('positions')
    .update(data)
    .eq('id', data.id)
    .select()
    .single();

  if (error) {
    toast.error(`Error updating position: ${error.message}`);
    return null;
  }
  return position;
}

export async function DeletePosition(id: number) {
  // Eliminar las filas relacionadas en position_assignments
  const { error: deleteAssignmentsError } = await supabase
    .from('position_assignments')
    .delete()
    .eq('position_id', id);

  if (deleteAssignmentsError) {
    toast.error(`Error deleting position assignments: ${deleteAssignmentsError.message}`);
    return;
  }

  // Eliminar la posición en positions
  const { error: deletePositionError } = await supabase
    .from('positions')
    .delete()
    .eq('id', id);

  if (deletePositionError) {
    toast.error(`Error deleting position: ${deletePositionError.message}`);
    return;
  }

  toast.success('Position deleted successfully');
}