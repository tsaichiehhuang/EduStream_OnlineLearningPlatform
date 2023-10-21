import { t } from "elysia";
import { IUser, UserRole } from "../types/type";
import { User } from "../models/user";
import { AuthType } from "../types/type";

export const info = (app: AuthType) =>
  app.get(
    "/info/:id",
    async ({ profile, set, params: { id } }) => {
      if (set.status !== 200 || !profile) return "Unauthorized";

      if (Number(profile.id) !== id) {
        set.status = 403;
        return "Permission Denied";
      }

      const user = await User.findOneBy({ id: id });
      if (!user) {
        set.status = 404;
        return "User Not Found";
      }

      const userObj: IUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
      };

      return {
        data: {
          user: userObj,
        },
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
