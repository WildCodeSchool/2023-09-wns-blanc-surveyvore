import Link from "next/link";

function NavHeader() {
  return (
    <nav>
      <Link
        href="/surveys/new"
        className="button-xl-primary-solid font-family-base">
        Nouveau formulaire
      </Link>
    </nav>
  );
}

export default NavHeader;

