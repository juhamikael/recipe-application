import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

const Pages = [
  { name: "Home", path: "/", key: "home" },
  { name: "Create a Recipe", path: "/create", key: "create" },
  { name: "How does it work", path: "/how", key: "how" },
  { name: "About", path: "/about", key: "about" },
];

const Header = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  // Get page
  const { route } = router;

  return (
    <div className="border-b border-white/20 py-2">
      <header className="mx-8 flex justify-between text-sm text-white">
        <Link href="/" className="logo text-3xl font-extrabold tracking-tight">
          Recipe <span className="text-[hsl(280,100%,70%)] ">Radar</span>
        </Link>
        <div className="flex items-center py-2 text-base uppercase ">
          {Pages.map((page, index) => (
            <div key={page.key}>
              {(isSignedIn || page.name !== "Create a Recipe") && (
                <Link href={page.path} className="hover:text-blue-200 ">
                  <p
                    className={`${
                      route === page.path ? "font-bold text-blue-400" : ""
                    } ${index === 0 ? "" : "ml-4"}`}
                  >
                    {page.name}
                  </p>
                </Link>
              )}
            </div>
          ))}
          {!isSignedIn && (
            <div className="ml-4">
              <Link href="/sign-in">Sign In</Link>
            </div>
          )}
          {isSignedIn && (
            <div className="ml-4">
              <UserButton />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
