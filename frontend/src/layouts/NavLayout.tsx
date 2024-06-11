import NavHeader from "@/components/NavHeader/NavHeader";

function NavLayout({
  children,
  newSurvey,
  backToForms,
  badge,
  signOut,
  profile,
  publish,
  signInOrSignUp,
}: {
  children: React.ReactNode;
  newSurvey?: boolean;
  backToForms?: boolean;
  badge?: boolean;
  signOut?: boolean;
  profile?: boolean;
  publish?: boolean;
  signInOrSignUp?: boolean;
}) {
  return (
    <>
      <NavHeader
        newSurvey={newSurvey}
        backToForms={backToForms}
        badge={badge}
        signOut={signOut}
        profile={profile}
        publish={publish}
        signInOrSignUp={signInOrSignUp}
      />
      <main className="main main-nav">{children}</main>
    </>
  );
}

export default NavLayout;

