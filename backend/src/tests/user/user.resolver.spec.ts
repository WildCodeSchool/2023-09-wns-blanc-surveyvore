import { ApolloServer, gql } from "apollo-server";
import createServerTest from "../../config/server_test";

const tokenContext: { token?: string } = {};

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServerTest(() => tokenContext);
  });

  afterAll(async () => {
    await server.stop();
  });

  it("test creation new user, sign in and return a token, delete account", async () => {
    const createUserMutation = gql`
      mutation CreateUser(
        $password: String!
        $email: String!
        $firstname: String!
        $lastname: String!
      ) {
        createUser(
          password: $password
          email: $email
          firstname: $firstname
          lastname: $lastname
        ) {
          email
        }
      }
    `;

    const signInMutation = gql`
      mutation Mutation($password: String!, $email: String!) {
        signIn(password: $password, email: $email)
      }
    `;

    const deleteUserMutation = gql`
      mutation Mutation {
        deleteUser
      }
    `;

    let signUpResponse = await server.executeOperation({
      query: createUserMutation,
      variables: {
        email: "test@test.ts",
        password: "testtest",
        firstname: "test",
        lastname: "test",
      },
    });

    expect(signUpResponse.errors).toBeUndefined();
    expect(signUpResponse.data?.createUser.email).toBe("test@test.ts");

    const signInTest = async (email: string, password: string) => {
      const signInResponse = await server.executeOperation({
        query: signInMutation,
        variables: {
          email: email,
          password: password,
        },
      });
      return signInResponse;
    };

    // test sign in wrong password or email
    const signInWrong = await signInTest("test@test.ts", "testtst");
    expect(signInWrong.errors).toBeDefined();

    // test sign in OK
    const signInOk = await signInTest("test@test.ts", "testtest");
    expect(signInOk.data?.signIn).toBeDefined();
    expect(typeof signInOk.data?.signIn).toBe("string");

    // test delete without token should return error
    const deleteUserResponseWithoutToken = await server.executeOperation({
      query: deleteUserMutation,
    });

    expect(deleteUserResponseWithoutToken.errors).toBeDefined();

    // test delete with token
    // Set the token in the context
    tokenContext.token = signInOk.data?.signIn;

    const deleteUserResponse = await server.executeOperation({
      query: deleteUserMutation,
    });

    expect(deleteUserResponse.data?.deleteUser).toBe("OK");
  });
});
