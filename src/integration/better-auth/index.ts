import { betterAuth } from "better-auth";
import { serverUrl } from "../../utils/environment";

export const betterAuthSecret = betterAuth({
  baseURL: serverUrl,
  basePath: "/authentication",
  user: {
    modelName: "User",
  },
  account: {
    modelName: "Account",
  },
  session: {
    modelName: "Session",
  },
  verification: {
    modelName: "Verification",
  },
});
