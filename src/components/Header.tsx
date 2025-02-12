import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 w-full flex justify-between items-center py-5">
      <div>
        <Link href="/" className="text-2xl sm:text-3xl font-bold">
          FREEBLOG
        </Link>
      </div>
    </header>
  );
};

export { Header };
