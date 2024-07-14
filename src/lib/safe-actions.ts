import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { auth } from "./auth";

export class ActionError extends Error {}

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authenticatedAction = action.use(async ({ next }) => {
  const session = await auth();
  if (!session) throw new ActionError("Unauthorized: No session found");

  const token = session.user.token;
  if (!token) throw new ActionError("Unauthorized: No token found");

  return next({ ctx: { token } });
});
