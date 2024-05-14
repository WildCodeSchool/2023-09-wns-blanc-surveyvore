import Head from "next/head";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Surveyvore</title>
                <meta name="description" content="Surveyvore" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
                    rel="stylesheet"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/ubj2mdm.css"
                ></link>
            </Head>
            {children}
        </>
    );
}

export default RootLayout;
