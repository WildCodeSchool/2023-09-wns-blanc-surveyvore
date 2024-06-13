import Input from "@/components/Input";
import NavLayout from "@/layouts/NavLayout";
import { GET_ME, UPDATE_USER } from "@/lib/queries/user.queries";
import { useMutation, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";

function Profile() {
  // ----------------------Queries & Mutations----------------------

  const { loading, error, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    variables: {
      token: localStorage.getItem("token"),
    },
  });

  const [updateMe] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_ME],
  });

  // ------------------------States & Hooks-------------------------

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [previousPassword, setPreviousPassword] =
    useState<string>("TuTenSouviensTu");
  const [newPassword, setNewPassword] = useState<string>("réfléchisUnPeu");
  const [confirmPassword, setConfirmPassword] = useState<string>(
    "TestDeMémoirePourLesNoobs"
  );

  const [editPersonalData, setEditPersonalData] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFirstname(data.getMe.firstname);
      setLastname(data.getMe.lastname);
      setEmail(data.getMe.email);
    }
  }, [data]);

  // -------------------------Handlers------------------------------

  async function handleSubmitPersonalData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitButton = (e.nativeEvent as any).submitter;

    if (submitButton.textContent === "Modifier") {
      setEditPersonalData(true);
    } else if (submitButton.textContent === "Enregistrer") {
      try {
        if (
          email !== data.getMe.email ||
          firstname !== data.getMe.firstname ||
          lastname !== data.getMe.lastname
        ) {
          console.log("something changed");

          await updateMe({
            variables: {
              firstname: firstname,
              lastname: lastname,
              email: email,
            },
          });
          setEditPersonalData(false);
        }
        console.log("nothing changed");
      } catch (error) {
        throw { error: error };
      }
    }
  }

  async function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitButton = (e.nativeEvent as any).submitter;

    if (submitButton.textContent === "Modifier") {
      setEditPassword(true);
    } else if (submitButton.textContent === "Enregistrer") {
      try {
        await updateMe({
          variables: {
            password: previousPassword,
            newPassword: newPassword,
          },
        });
        setEditPassword(false);
      } catch (error) {
        throw { error: error };
      }
    }
  }

  // --------------------------Returns-----------------------------
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="edit-profile">
      <form className="personal-infos" onSubmit={handleSubmitPersonalData}>
        <Input
          type="text"
          labelName="Firstname"
          inputName="firstname"
          value={firstname}
          readOnly={!editPersonalData}
          setValue={setFirstname}
        />
        <Input
          type="text"
          labelName="Lastname"
          inputName="lastname"
          value={lastname}
          readOnly={!editPersonalData}
          setValue={setLastname}
        />
        <Input
          type="email"
          labelName="Email"
          inputName="username"
          value={email}
          readOnly={!editPersonalData}
          setValue={setEmail}
        />
        <div className="buttons">
          <button
            name="save-personal-infos"
            type="submit"
            className="button-md-primary-solid">
            {editPersonalData ? "Enregistrer" : "Modifier"}
          </button>
          {editPersonalData && (
            <button
              name="cancel-personal-infos"
              type="button"
              className="button-md-primary-outline"
              onClick={() => {
                setEditPersonalData(false);
                setFirstname(data.getMe.firstname);
                setLastname(data.getMe.lastname);
                setEmail(data.getMe.email);
              }}>
              Annuler
            </button>
          )}
        </div>
      </form>

      <form className="change-password" onSubmit={handleSubmitPassword}>
        <input type="hidden" name="username" value={email} />
        <Input
          type="password"
          labelName="Ancien mot de passe"
          inputName="previousPassword"
          value={previousPassword}
          readOnly={!editPassword}
          setValue={setPreviousPassword}
        />
        <Input
          type="password"
          labelName="Nouveau mot de passe"
          inputName="newPassword"
          value={newPassword}
          readOnly={!editPassword}
          setValue={setNewPassword}
        />
        <Input
          type="password"
          labelName="Confirmer le mot de passe"
          inputName="confirmPassword"
          value={confirmPassword}
          readOnly={!editPassword}
          setValue={setConfirmPassword}
        />
        <div className="buttons">
          <button
            name="save-password"
            type="submit"
            className="button-md-primary-solid">
            {editPassword ? "Enregistrer" : "Modifier"}
          </button>
          {editPassword && (
            <button
              name="cancel-password"
              type="button"
              className="button-md-primary-outline"
              onClick={() => {
                setEditPassword(false);
                setPreviousPassword("TuTenSouviensTu");
                setNewPassword("réfléchisUnPeu");
                setConfirmPassword("TestDeMémoirePourLesNoobs");
              }}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
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

