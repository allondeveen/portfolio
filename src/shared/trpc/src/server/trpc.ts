import { t } from "./init";
import { requireAccessToken } from "./middleware/requireAccessToken";

export const createTRPCRouter = t.router;
export const mergeTRPCRouters = t.mergeRouters;
export const protectedProcedure = t.procedure.use(requireAccessToken);
