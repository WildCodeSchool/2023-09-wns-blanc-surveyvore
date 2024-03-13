import Input from "@/components/Input";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SIGN_IN = gql`
  mutation Mutation($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }
`;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [signIn] = useMutation(SIGN_IN, {
    variables: {
      email,
      password,
    },
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn);
      router.push("/");
    },
  });

  return (
    <div className="sign-in">
      <img
        src={"/Logo-baseline.svg"}
        alt="Surveyvore's logo linked to home page"
        className="logo"
      />

      <section className="sign-in-form">
        <Input
          type="email"
          inputName="email"
          placeholder="example@gmail.com"
          labelName="Email"
          labelClassName="input-field"
          inputClassName="input"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          inputName="password"
          placeholder="********"
          labelName="Mot de passe"
          labelClassName="input-field"
          inputClassName="input"
          value={password}
          setValue={setPassword}
        />
        <button
          className="button-md-primary-solid"
          type="button"
          onClick={() => signIn()}>
          Se connecter
        </button>
      </section>

      <p className="no-account">
        Pas encore inscrit·e ? <Link href="/signup">S’inscrire</Link>
      </p>
    </div>
  );
}

export default SignIn;

