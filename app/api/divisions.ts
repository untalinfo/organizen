import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "react-toastify";

export default async function Divisions() {
  const { data: divisions, error } = await supabase.from('divisions').select(`id, name`);

  if (error) {
    toast.error(`Error feching division: ${error.message}`);
  }
  return divisions;
}