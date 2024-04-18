import Head from "next/head";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Surveyvore</title>
        <meta name="description" content="Surveyvore" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

export default RootLayout;

