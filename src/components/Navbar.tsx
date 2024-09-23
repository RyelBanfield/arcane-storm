import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <h1 className="font-bold uppercase leading-none tracking-tighter">
        Arcane Storm
      </h1>

      <UserButton />
    </div>
  );
};

export default Navbar;
