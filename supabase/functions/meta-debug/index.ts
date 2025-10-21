// Deno test: verificar se os secrets estão disponíveis
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req: Request) => {
  const dataset = Deno.env.get("META_DATASET_ID");
  const token = Deno.env.get("META_CONVERSION_API_TOKEN");
  
  return new Response(
    JSON.stringify({
      dataset_id: dataset || "MISSING",
      token_length: token ? token.length : 0,
      token_first_20: token ? token.substring(0, 20) : "NONE",
      token_last_10: token ? token.substring(token.length - 10) : "NONE",
      all_env_keys: Object.keys(Deno.env.toObject())
    }, null, 2),
    { headers: { "Content-Type": "application/json" } }
  );
});
