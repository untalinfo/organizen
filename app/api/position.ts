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

export async function PositionById(id: number) {
  const { data: position, error } = await supabase.from('positions').select(
    `id, name, position_assignments(id, employees(id, full_name, email)))`
  ).eq('id', id).single();
  if (error) {
    toast.error(`Error feching position by id: ${error.message}`);
  }
  return position;
}


export async function EditPosition(data: Partial<Position>): Promise<Position | null> {
  const updateData: Partial<Position> = {};

  console.log('data que llega', data);

  if (data.name) {
    updateData.name = data.name;
  }

  if (data.division_id) {
    updateData.division_id = data.division_id;
  }

  const { data: position, error } = await supabase
    .from('positions')
    .update(updateData)
    .eq('id', data.id)
    .select()
    .single();

  if (error) {
    toast.error(`Error updating position: ${error.message}`);
    return null;
  }
  return position;
}