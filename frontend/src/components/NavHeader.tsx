import Link from "next/link";
import Image from "next/image";

function NavHeader() {
  return (
    <nav className="nav-container">
      <Link href="/" className="logo">
        <Image
          src={"/Logo-baseline.svg"}
          alt="Surveyvore's logo linked to home page"
          width={256}
          height={64}
          priority
        />
      </Link>
      <Link
        href="/surveys/new"
        className="button-md-primary-solid font-family-base">
        Nouveau formulaire
      </Link>
    </nav>
  );
}

export default NavHeader;

