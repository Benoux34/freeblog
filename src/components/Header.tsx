import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-5">
      <div>
        <p className="text-2xl sm:text-3xl font-bold">FREEBLOG</p>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export { Header };
