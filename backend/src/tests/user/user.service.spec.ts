import * as userService from "../../services/user.service";
import { User } from "../../entities/user";
import * as dotenv from "dotenv";
import { dataSourceTest } from "../../config/dbTest";

beforeAll(async () => {
  dotenv.config();
  await dataSourceTest.initialize();
});

describe("User service", () => {
  it("Test 01 -create new user", async () => {
    const userMock = jest
      .spyOn(User.prototype, "save")
      .mockImplementation(async () => {
        return {
          email: "anewuser@test1.fr",
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$BtNN5iK1WMinyzzzjZavbw$4ayubPITQi55NK31ZyLW/7k/InQJcYFhUqMnm50K5J0",
        } as User;
      });
    const user = await userService.createUser("anewuser@test1.fr", "1234");

    expect(user.email).toBe("anewuser@test1.fr");
    expect(user.password).toBe(
      "$argon2id$v=19$m=65536,t=3,p=4$BtNN5iK1WMinyzzzjZavbw$4ayubPITQi55NK31ZyLW/7k/InQJcYFhUqMnm50K5J0"
    );
    expect(userMock).toHaveBeenCalled();
    expect(userMock).toHaveBeenCalledTimes(1);
  });
});
