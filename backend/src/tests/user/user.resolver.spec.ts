import { ApolloServer, gql } from "apollo-server";
import createServer from "../../config/server";

const tokenContext: { token?: string } = {};

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer(() => tokenContext);
  });

  it("test creation new user", async () => {
    const createUserMutation = gql`
      mutation CreateUser($password: String!, $email: String!) {
        createUser(password: $password, email: $email) {
          email
        }
      }
    `;

    let response = await server.executeOperation({
      query: createUserMutation,
      variables: {
        email: "test@test.ts",
        password: "testtest",
      },
    });

    tokenContext.token = "Bearer test";

    response = await server.executeOperation({
      query: createUserMutation,
      variables: {
        email: "test@test.ts",
        password: "testtest",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createUser.email).toBe("test@test.ts");
  });
});
