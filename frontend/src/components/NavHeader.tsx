import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Button from "./Button";

const CREATE_SURVEY = gql`
  mutation Mutation($title: String!) {
    createSurvey(title: $title)
  }
`;

function NavHeader() {
  const router = useRouter();

  console.log("router", router);

  const [createSurvey] = useMutation(CREATE_SURVEY, {
    variables: { title: "Formulaire sans titre" },
    onCompleted: () => {
      router.push("/surveys/new");
    },
  });
  if (router.pathname === "/signin" || router.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="nav-container">
      <Link href="/" className="logo">
        <img
          src={"/Logo-baseline.svg"}
          alt="Surveyvore's logo linked to home page"
        />
      </Link>
      <Button
        text="Nouveau formulaire"
        type="button"
        alt="add icon to create a new survey"
        handleClick={() => createSurvey()}
        icon={"/plus.svg"}
        className="button-md-primary-solid font-family-base"
      />
    </nav>
  );
}

export default NavHeader;

