import type { MaintenanceContentRouter } from "../trpc-server";
import type { TRPCClient } from "@allondeveen-portfolio/trpc/client";

export async function maintenanceContentLoader(client: TRPCClient<MaintenanceContentRouter>) {
  try {
    return await client.maintenance.query();
  } catch (e) {
    console.log(e);
    throw new Response(null, {
      status: 503,
      statusText: "Service Unavailable",
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
