import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@/styles/reset.css";
import "@/styles/index.scss";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
