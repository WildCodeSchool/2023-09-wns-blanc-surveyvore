import Icon from "@/components/Icon/Icon";
import Input from "@/components/Input";
import Modal from "@/components/Modal/Modal";
import PasswordValidationList from "@/components/PasswordValidationList";
import NavLayout from "@/layouts/NavLayout";
import { passwordValidationMessages } from "@/lib/fixtures/data";
import { GET_ME, UPDATE_USER } from "@/lib/queries/user.queries";
import {
  PasswordValidationProps,
  validatePassword,
} from "@/lib/tools/user.tools";
import { useMutation, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";
import Swal from "sweetalert2";

// transition buttons

// bouton de suppression du profil
// modale de confirmation pour la suppression du profil
// affichage d'une page de confirmation de suppression avec message et lien de redirection vers l'accueil
type ModalProps = {
  isOpen: boolean;
  content: string;
};

type ErrorMessage = {
  target: string;
  type: string;
  message: string;
};

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

  const [personalData, setPersonalData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [previousPassword, setPreviousPassword] =
    useState<string>("TuTenSouviensTu");
  const [newPassword, setNewPassword] = useState<string>("réfléchisUnPeu");
  const [confirmPassword, setConfirmPassword] = useState<string>(
    "TestDeMémoirePourLesNoobs"
  );

  const [editPersonalData, setEditPersonalData] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const [messages, setMessages] = useState<ErrorMessage[]>([]);
  const [changePasswordMessages, setChangePasswordMessages] = useState<
    ErrorMessage[]
  >([]);
  const [passwordValidations, setPasswordValidations] = useState<
    PasswordValidationProps[]
  >(passwordValidationMessages);

  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    content: "",
  });
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  useEffect(() => {
    if (data) {
      setPersonalData({
        firstname: data.getMe.firstname,
        lastname: data.getMe.lastname,
        email: data.getMe.email,
      });
    }
  }, [data]);

  console.log(personalData);

  useEffect(() => {
    validatePassword(newPassword, setPasswordValidations, passwordValidations);

    if (newPassword === confirmPassword) {
      setChangePasswordMessages((prev) => [
        ...prev.filter((el) => el.target !== "newPassword"),
      ]);
    }
  }, [newPassword, confirmPassword, previousPassword]);

  useEffect(() => {
    if (changePasswordMessages.find((el) => el.target === "previousPassword")) {
      setChangePasswordMessages((prev) => [
        ...prev.filter((el) => el.target !== "previousPassword"),
      ]);
    }
  }, [previousPassword]);

  const { firstname, lastname, email } = personalData;

  useEffect(() => {
    if (
      messages.find((el) => el.message === "Aucun champ n'a été modifié.") &&
      (firstname === data.getMe.firstname ||
        lastname === data.getMe.lastname ||
        email === data.getMe.email)
    ) {
    }
    setMessages([]);
  }, [firstname, lastname, email]);

  // -------------------------Handlers------------------------------

  const updatePersonalData = (
    key: "firstname" | "lastname" | "email",
    value: string
  ) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  function toast(icon: "success" | "error", title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function handleSubmitPersonalData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitButton = (e.nativeEvent as any).submitter;

    if (submitButton.textContent === "Modifier") {
      setEditPersonalData(true);
    } else if (submitButton.textContent === "Enregistrer") {
      if (email !== data.getMe.email) {
        setModal({
          isOpen: true,
          content:
            "Êtes-vous certain de vouloir modifier votre adresse email ?",
        });
        setPendingAction(() => async () => {
          try {
            await updateMe({
              variables: {
                firstname: firstname,
                lastname: lastname,
                email: email,
              },
            });
            setEditPersonalData(false);
            setModal({
              isOpen: false,
              content: "",
            });
            toast("success", "Modifié avec succes !");
          } catch (error: any) {
            setMessages((prev: any) => [...prev, { error: error.message }]);
            toast("error", "Une erreur s'est produite !");
            throw { error: error };
          }
        });
      } else if (
        firstname !== data.getMe.firstname ||
        lastname !== data.getMe.lastname
      ) {
        try {
          await updateMe({
            variables: {
              firstname: firstname,
              lastname: lastname,
              email: email,
            },
          });
          setEditPersonalData(false);
          toast("success", "Modifié avec succes !");
        } catch (error: any) {
          setMessages((prev: any) => [
            ...prev,
            { target: "user", error: error.message },
          ]);
          throw { error: error };
        }
      } else {
        setMessages((prev: any) => [
          ...prev,
          {
            target: email,
            type: "warning",
            message: "Aucun champ n'a été modifié.",
          },
        ]);
      }
    }
  }

  async function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitButton = (e.nativeEvent as any).submitter;

    if (submitButton.textContent === "Modifier") {
      setEditPassword(true);
    } else if (submitButton.textContent === "Enregistrer") {
      if (newPassword !== confirmPassword) {
        setChangePasswordMessages((previousMessages: any) => [
          ...previousMessages,
          {
            target: "newPassword",
            type: "warning",
            message: "Les nouveaux mots de passe ne sont pas identiques.",
          },
        ]);
        return;
      }

      setModal({
        isOpen: true,
        content: "Êtes-vous certain de vouloir modifier votre mot de passe ?",
      });

      setPendingAction(() => async () => {
        try {
          await updateMe({
            variables: {
              password: previousPassword,
              newPassword: newPassword,
            },
          });
          setEditPassword(false);
          toast("success", "Modifié avec succes !");
        } catch (error: any) {
          setChangePasswordMessages((previousMessages: any) => [
            ...previousMessages,
            {
              target: "previousPassword",
              type: "error",
              message: error.message,
            },
          ]);
          throw { error: error };
        }
      });
    }
  }

  // --------------------------Returns-----------------------------
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <div className="edit-profile">
      <h2>Modifications des données personnelles</h2>
      <form className="personal-infos" onSubmit={handleSubmitPersonalData}>
        <Input
          type="text"
          labelName="Firstname"
          inputName="firstname"
          value={firstname}
          disabled={!editPersonalData}
          setValue={(value: string) => updatePersonalData("firstname", value)}
        />
        <Input
          type="text"
          labelName="Lastname"
          inputName="lastname"
          value={lastname}
          disabled={!editPersonalData}
          setValue={(value: string) => updatePersonalData("lastname", value)}
        />
        <Input
          type="email"
          labelName="Email"
          inputName="email"
          value={email}
          disabled={!editPersonalData}
          setValue={(value: string) => updatePersonalData("email", value)}
        />
        {messages &&
          messages.map((el, index: number) => (
            <div key={index} className={`message ${el.type}`}>
              <Icon
                name={el.type === "warning" ? "warning" : "cross"}
                width="16"
              />
              <p>{el.message as string}</p>
            </div>
          ))}
        <div className="buttons">
          <button
            name="save-personal-infos"
            type="submit"
            className="button-md-primary-solid"
            disabled={
              editPersonalData && Object.entries(messages).length > 0 && true
            }>
            {editPersonalData ? "Enregistrer" : "Modifier"}
          </button>
          {editPersonalData && (
            <button
              name="cancel-personal-infos"
              type="button"
              className="button-md-primary-outline"
              onClick={() => {
                setEditPersonalData(false);
                setPersonalData({
                  firstname: data.getMe.firstname,
                  lastname: data.getMe.lastname,
                  email: data.getMe.email,
                });
                setMessages([]);
              }}>
              Annuler
            </button>
          )}
        </div>
      </form>
      <h2>Modification du mot de passe</h2>
      <form className="change-password" onSubmit={handleSubmitPassword}>
        <input type="hidden" name="username" value={email} />
        <Input
          type="password"
          labelName="Ancien mot de passe"
          inputName="previousPassword"
          value={previousPassword}
          disabled={!editPassword}
          setValue={setPreviousPassword}
        />
        <Input
          type="password"
          labelName="Nouveau mot de passe"
          inputName="newPassword"
          value={newPassword}
          disabled={!editPassword}
          setValue={setNewPassword}
        />
        <Input
          type="password"
          labelName="Confirmer le mot de passe"
          inputName="confirmPassword"
          value={confirmPassword}
          disabled={!editPassword}
          setValue={setConfirmPassword}
        />
        {editPassword && (
          <PasswordValidationList validations={passwordValidations} />
        )}
        {changePasswordMessages &&
          editPassword &&
          changePasswordMessages.map((error, index) => (
            <div key={index} className={`messages ${error.type}`}>
              <p>{error.message as string}</p>
            </div>
          ))}
        <div className="buttons">
          <button
            name="save-password"
            type="submit"
            className="button-md-primary-solid"
            disabled={
              editPassword && changePasswordMessages.length > 0 && true
            }>
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
                setChangePasswordMessages([]);
              }}>
              Annuler
            </button>
          )}
        </div>
      </form>
      {modal.isOpen && (
        <Modal
          title={modal.content}
          isOpen={modal.isOpen}
          setIsOpen={() => setModal({ isOpen: false, content: "" })}>
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                pendingAction();
                setModal({ isOpen: false, content: "" });
              }}
              className="button-md-error-solid">
              Confirmer
            </button>
            <button
              onClick={() => setModal({ isOpen: false, content: "" })}
              className="button-md-primary-outline">
              Annuler
            </button>
          </div>
        </Modal>
      )}
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

