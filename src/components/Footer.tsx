import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-6">
      <p className="text-center text-xs text-neutral-950">
        &copy; {new Date().getFullYear()} RCB Software. All rights reserved. |
        Made with ⚡️ by{" "}
        <Link href="https://ryelbanfield.me" target="_blank" rel="noreferrer">
          Ryel Banfield
        </Link>
      </p>
    </div>
  );
};

export default Footer;
