import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";

const CREATE_SURVEY = gql`
  mutation Mutation($title: String!) {
    createSurvey(title: $title)
  }
`;

function NavHeader() {
  const router = useRouter();
  const [createSurvey] = useMutation(CREATE_SURVEY, {
    variables: { title: "Formulaire sans titre" },
    onCompleted: (data) => {
      router.push(`/surveys/${data.createSurvey}`);
    },
  });

  return (
    <nav className="nav-container">
      <Link href="/" className="logo">
        <img
          src="/Logo-baseline.svg"
          alt="Surveyvore's logo linked to home page"
          className="logo logo-desktop"
        />
        <img
          src="/Logo.svg"
          alt="Surveyvore's logo linked to home page"
          className="logo logo-mobile"
        />
      </Link>
      <div className="nav-buttons">
        <button
          className="button-md-primary-solid"
          onClick={() => createSurvey()}>
          <Icon name="plus" />
          <span className="hidden-mobile">Nouveau formulaire</span>
        </button>
        <button className="button-md-grey-outline">
          <Icon name="user" />
          <span className="hidden-mobile">Mon profil</span>
        </button>
      </div>
    </nav>
  );
}

export default NavHeader;

