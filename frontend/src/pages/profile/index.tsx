import Input from "@/components/Input";
import Modal from "@/components/Modal/Modal";
import NavLayout from "@/layouts/NavLayout";
import { GET_ME, UPDATE_USER } from "@/lib/queries/user.queries";
import { validatePassword } from "@/lib/tools/user.tools";
import { useMutation, useQuery } from "@apollo/client";
import React, { ReactElement, useEffect, useState } from "react";

// affichage des infos mots de passes façon checklist
// disable les inputs plutot que readonly
// transition buttons

// toast de modif des infos de l'utilisateur
// toast de modification du mot de passe

// bouton de suppression du profil
// modale de confirmation pour la suppression du profil
// affichage d'une page de confirmation de suppression avec message et lien de redirection vers l'accueil
type ModalProps = {
  isOpen: boolean;
  content: string;
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

  const [messages, setMessages] = useState<any>({});
  const [changePasswordMessages, setChangePasswordMessages] = useState<any>({});

  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    content: "",
  });
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  useEffect(() => {
    if (data) {
      setFirstname(data.getMe.firstname);
      setLastname(data.getMe.lastname);
      setEmail(data.getMe.email);
    }
  }, [data]);

  useEffect(() => {
    validatePassword(newPassword, setChangePasswordMessages);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (
      messages.content === "Aucun champ n'a été modifié." &&
      (firstname === data.getMe.firstname ||
        lastname === data.getMe.lastname ||
        email === data.getMe.email)
    ) {
    }
    setMessages({});
  }, [firstname, lastname, email]);

  // -------------------------Handlers------------------------------

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
          } catch (error: any) {
            setMessages({ error: error.message });
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
        } catch (error: any) {
          setMessages({ error: error.message });
          throw { error: error };
        }
      } else {
        setMessages({ warning: "Aucun champ n'a été modifié." });
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
        setChangePasswordMessages((previousMessages: any) => ({
          ...previousMessages,
          warning: "Les nouveaux mots de passe ne sont pas identiques.",
        }));
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
        } catch (error: any) {
          setChangePasswordMessages((previousMessages: any) => ({
            ...previousMessages,
            error: error.message,
          }));
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
        {messages &&
          Object.entries(messages).map(([key, value], index) => (
            <div key={index} className={`messages ${key}`}>
              <p>{value as string}</p>
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
                setFirstname(data.getMe.firstname);
                setLastname(data.getMe.lastname);
                setEmail(data.getMe.email);
                setMessages({});
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
        {changePasswordMessages &&
          editPassword &&
          Object.entries(changePasswordMessages).map(([key, value], index) => (
            <div key={index} className={`messages ${key}`}>
              <p>{value as string}</p>
            </div>
          ))}
        <div className="buttons">
          <button
            name="save-password"
            type="submit"
            className="button-md-primary-solid"
            disabled={
              editPassword &&
              Object.entries(changePasswordMessages).length > 0 &&
              true
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
                setChangePasswordMessages({});
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

