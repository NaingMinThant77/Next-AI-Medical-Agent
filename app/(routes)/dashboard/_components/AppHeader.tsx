import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const menuOptions = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "History", path: "/history" },
  { id: 3, name: "Pricing", path: "/pricing" },
  { id: 4, name: "Profile", path: "/profile" },
];

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
      <Image src="/logo.svg" alt="Logo" width={180} height={90} />
      <div className="hidden md:flex items-center gap-10">
        {menuOptions.map((option) => (
          <div key={option.id}>
            <Link
              href={option.path}
              className="hover:font-bold cursor-pointer transition-all duration-300"
            >
              {option.name}
            </Link>
          </div>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default AppHeader;
