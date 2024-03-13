import NavLayout from "@/layouts/NavLayout";
import { ReactElement } from "react";

export default function Home() {
  return <div></div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>{page}</NavLayout>
  )
}


