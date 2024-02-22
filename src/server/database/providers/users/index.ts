import * as GetByEmail from "./GetByEmail";
import * as Create from "./Create";

export const UserProvider = {
  ...Create,
  ...GetByEmail,
};