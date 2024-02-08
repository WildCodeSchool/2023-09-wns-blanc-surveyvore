import NavHeader from "@/components/NavHeader";
import Head from "next/head";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>The good corner</title>
        <meta name="description" content="The good corner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      <main className="main-content">{children}</main>
    </>
  );
}

export default RootLayout;

