import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex mt-20 items-center justify-center">
      <SignUp />
    </div>
  );
};

export default Page;
