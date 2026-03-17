import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex mt-40 items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Page;
