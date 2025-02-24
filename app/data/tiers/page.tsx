import { supabase } from "@/utils/supabase/supabaseClient";

export default async function Tiers() {
  const { data: tiers, error } = await supabase.from('tiers').select('*');

  if (error) {
    console.error("Error fetching tiers:", error);
    return <div>Error fetching tiers</div>;
  }

  return <pre>{JSON.stringify(tiers, null, 2)}</pre>;
}
