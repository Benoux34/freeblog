import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 w-full flex justify-between items-center py-5">
      <div>
        <Link href="/" className="text-2xl sm:text-3xl font-bold">
          FREEBLOG
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-x-5">
            <Link href="/admin">
              <Button size={"sm"} variant={"outline"}>
                Admin
              </Button>
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export { Header };
