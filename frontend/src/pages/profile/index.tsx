import Input from "@/components/Input";
import NavLayout from "@/layouts/NavLayout";
import { GET_ME } from "@/lib/queries/user.queries";
import { useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";

function Profile() {
  const { loading, error, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    variables: {
      token: localStorage.getItem("token"),
    },
  });
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [previousPassword, setPreviousPassword] =
    useState<string>("TuTenSouviensTu");
  const [newPassword, setNewPassword] = useState<string>("réfléchisUnPeu");
  const [confirmPassword, setConfirmPassword] = useState<string>(
    "TestDeMémoirePourLesNoobs"
  );

  const [readOnlyPersonalInfo, setReadOnlyPersonalInfo] =
    useState<boolean>(true);
  const [readOnlyPassword, setReadOnlyPassword] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setFirstname(data.getMe.firstname);
      setLastname(data.getMe.lastname);
      setEmail(data.getMe.email);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <form className="edit-profile">
      <section className="personal-infos">
        <Input
          type="text"
          labelName="Firstname"
          inputName="firstname"
          value={firstname}
          readOnly={readOnlyPersonalInfo}
          setValue={setFirstname}
        />
        <Input
          type="text"
          labelName="Lastname"
          inputName="lastname"
          value={lastname}
          readOnly={readOnlyPersonalInfo}
          setValue={setLastname}
        />
        <Input
          type="email"
          labelName="Email"
          inputName="email"
          value={email}
          readOnly={readOnlyPersonalInfo}
          setValue={setEmail}
        />
        <button
          type="submit"
          className="button-md-primary-outline"
          onClick={(e) => {
            e.preventDefault();
            setReadOnlyPersonalInfo(!readOnlyPersonalInfo);
          }}>
          {readOnlyPersonalInfo ? "Modifier" : "Enregistrer"}
        </button>
      </section>

      <section className="change-password">
        <Input
          type="password"
          labelName="Ancien mot de passe"
          inputName="previousPassword"
          value={previousPassword}
          readOnly={readOnlyPassword}
          setValue={setPreviousPassword}
        />
        <Input
          type="password"
          labelName="Nouveau mot de passe"
          inputName="newPassword"
          value={newPassword}
          readOnly={readOnlyPassword}
          setValue={setNewPassword}
        />
        <Input
          type="password"
          labelName="Confirmer le mot de passe"
          inputName="confirmPassword"
          value={confirmPassword}
          readOnly={readOnlyPassword}
          setValue={setConfirmPassword}
        />
        <button
          type="submit"
          className="button-md-primary-outline"
          onClick={(e) => {
            e.preventDefault();
            setReadOnlyPassword(!readOnlyPassword);
          }}>
          {readOnlyPassword ? "Modifier" : "Enregistrer"}
        </button>
      </section>
    </form>
  );
}

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout newSurvey backToForms signOut>
      {page}
    </NavLayout>
  );
};

