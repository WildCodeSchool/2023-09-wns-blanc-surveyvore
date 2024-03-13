import NavHeader from "@/components/NavHeader/NavHeader";

function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavHeader />
      <main className="main main-nav">
        {children}
      </main>
    </>
  );
}

export default NavLayout;

