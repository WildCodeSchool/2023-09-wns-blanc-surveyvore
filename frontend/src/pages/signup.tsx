import Input from "@/components/Input";
import LogLayout from "@/layouts/LogLayout";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

const SIGN_UP = gql`
    mutation CreateUser(
        $lastname: String!
        $firstname: String!
        $password: String!
        $email: String!
    ) {
        createUser(
            lastname: $lastname
            firstname: $firstname
            password: $password
            email: $email
        ) {
            email
        }
    }
`;

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const router = useRouter();

    const [signUp] = useMutation(SIGN_UP, {
        variables: {
            email,
            password,
            lastname,
            firstname,
        },
        onCompleted: () => {
            router.push("/signin");
        },
    });

    return (
        <div className="sign-up">
            <img
                src={"/Logo-baseline.svg"}
                alt="Surveyvore's logo linked to home page"
                className="logo"
            />

            <form
                className="sign-up-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    signUp();
                }}
            >
                <Input
                    type="firstname"
                    inputName="firstname"
                    placeholder="Paul"
                    labelName="Prénom"
                    value={firstname}
                    setValue={setFirstname}
                />
                <Input
                    type="lastname"
                    inputName="lastname"
                    placeholder="Ochon"
                    labelName="Nom"
                    value={lastname}
                    setValue={setLastname}
                />
                <Input
                    type="email"
                    inputName="email"
                    placeholder="example@gmail.com"
                    labelName="Email"
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    type="password"
                    inputName="password"
                    placeholder="••••••••"
                    labelName="Mot de passe"
                    value={password}
                    setValue={setPassword}
                />
                <button className="button-md-primary-solid" type="submit">
                    Créer mon compte
                </button>
            </form>

            <p className="existing-account">
                Vous possédez déjà un compte ?
                <Link href="/signin">Se connecter</Link>
            </p>
        </div>
    );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
    return <LogLayout>{page}</LogLayout>;
};

export default SignUp;
