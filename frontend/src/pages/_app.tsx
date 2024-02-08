import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@/styles/reset.css";
import "@/styles/index.scss";
import RootLayout from "@/layouts/RootLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });

