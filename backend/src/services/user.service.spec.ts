import * as userService from "../services/user.service";
import { User } from "../entities/user";

const userMock = jest
  .spyOn(User.prototype, "save")
  .mockImplementation(async () => {
    return {
      email: "test@test.fr",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$BtNN5iK1WMinyzzzjZavbw$4ayubPITQi55NK31ZyLW/7k/InQJcYFhUqMnm50K5J0",
    } as User;
  });

describe("User service", () => {
  it("create new user", async () => {
    const user = await userService.createUser("test@test.ts", "test");

    expect(user.email).toBe("test@test.ts");
    expect(user.password).toBe(
      "$argon2id$v=19$m=65536,t=3,p=4$BtNN5iK1WMinyzzzjZavbw$4ayubPITQi55NK31ZyLW/7k/InQJcYFhUqMnm50K5J0"
    );
    expect(userMock).toHaveBeenCalled();
    expect(userMock).toHaveBeenCalledTimes(1);
  });
});
