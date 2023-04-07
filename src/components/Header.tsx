import Link from "next/link";
import { useRouter } from "next/router";

const Pages = [
  { name: "Home", path: "/", key: "home" },
  { name: "Create a Recipe", path: "/create", key: "create" },
  { name: "How does it work", path: "/how", key: "how" },
  { name: "About", path: "/about", key: "about" },
];

const Header = () => {
  // Get active page
  const router = useRouter();
  // Get page
  const { route } = router;

  return (
    <div className="border-b border-white/20 py-2">
      <header className="mx-8 flex justify-between text-sm text-white">
        <Link href="/" className="logo text-3xl font-extrabold tracking-tight">
          Recipe <span className="text-[hsl(280,100%,70%)] ">App</span>
        </Link>
        <div className="flex items-center gap-6 py-2 text-base uppercase ">
          {Pages.map((page) => (
            // Set color for active page
            <div key={page.key}>
              <Link href={page.path} className="hover:text-blue-200 ">
                <p
                  className={`${
                    route === page.path ? "font-bold text-blue-400" : ""
                  }`}
                >
                  {page.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Header;
