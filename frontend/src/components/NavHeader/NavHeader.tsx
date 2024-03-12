import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Button from "../Button";
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
            <div className="nav-buttons">
                <button className="button-md-primary-solid">
                    <Icon name="plus" />
                    Nouveau formulaire
                </button>
                <button className="button-md-grey-outline">
                    <Icon name="user" />
                    Mon profil
                </button>
            </div>
        </nav>
    );
}

export default NavHeader;
