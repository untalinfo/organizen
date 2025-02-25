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

export async function fetchCreateNewPosition(reports_to_id: number, current_tier_id: number): Promise<Position | null> {
  const new_tier_id = current_tier_id + 1;

  // Verificar si el nuevo tier ya existe
  const { data: existingTier, error: tierError } = await supabase
    .from('tiers')
    .select('*')
    .eq('id', new_tier_id);

  console.log('existingTier', existingTier);

  if (tierError && tierError.code !== 'PGRST116') { // PGRST116: No rows found
    toast.error(`Error checking tier: ${tierError.message}`);
    return null;
  }

  // Si el nuevo tier no existe, crearlo
  if (existingTier?.length === 0) {
    console.log('Creating new tier', new_tier_id);
    const { error: createTierError } = await supabase
      .from('tiers')
      .insert({ id: new_tier_id, name: `Tier ${new_tier_id}` })
      .select()
      .single();

    if (createTierError) {
      toast.error(`Error creating new tier: ${createTierError.message}`);
      return null;
    }
  }

  // Crear la nueva posición
  const { data: newPosition, error: createPositionError } = await supabase
    .from('positions')
    .insert({
      reports_to_id,
      tier_id: new_tier_id
    })
    .select()
    .single();

  if (createPositionError) {
    toast.error(`Error creating new position: ${createPositionError.message}`);
    return null;
  }

  toast.success('Position created successfully');
  return newPosition;
}