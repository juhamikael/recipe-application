import { useEffect, useState } from "react";
import { Accordion, Title, useMantineTheme, rem } from "@mantine/core";
import { Icon } from "@iconify/react";
import Link from "next/link";
type IContent = {
  id: number;
  icon: string;
  content: string;
  title: string;
  readMore?: string | null;
  readMore?: string | null;
};

const HowData = [
  {
    id: 1,
    icon: "material-symbols:search",
    title: "Search",
    content:
      "The app allow users to search for recipes by type of dish, recipe name and cooking time (e.g. less than 10 minutes, 30 minutes, 1 hour).",
    readMore: null,
  },
  {
    id: 2,
    icon: "material-symbols:library-add",
    title: "Add recipes",
    content:
      "The application provide step-by-step instructions for the preparation of recipes.",
    readMore: null,
  },
  {
    id: 3,
    icon: "streamline:programming-browser-key-secure-password-window-browser-key-security-login",
    title: "Authentication",
    content:
      "The Authentication is done with Clerk. The user can sign up / in with Email, Google or GitHub",
    readMore: "https://clerk.com/docs",
  },
  {
    id: 4,
    icon: "fluent-mdl2:add-to-shopping-list",
    title: "Create shopping list",
    content:
      "TODO: The application let users to create shopping lists from recipes selected by the user.",
    readMore: null,
  },
];

const How = () => {
  const theme = useMantineTheme();

  const [howTo, setHowTo] = useState<IContent[]>([]);
  const [howTo, setHowTo] = useState<IContent[]>([]);

  useEffect(() => {
    setHowTo(HowData);
  }, []);
  useEffect(() => {
    setHowTo(HowData);
  }, []);

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="flex w-1/2 flex-col ">
          {howTo && (
            <>
              <Title className="text-3xl font-bold text-white">
                How does it work?
                How does it work?
              </Title>
              <Accordion
                className="mt-10"
                styles={{
                  item: {
                    backgroundColor: "#0f0f0f",
                    border: `${rem(1)} solid transparent`,
                    position: "relative",
                    zIndex: 0,
                    transition: "transform 150ms ease",

                    "&[data-active]": {
                      transform: "scale(1.03)",
                      backgroundColor: "#0f0f0f",
                      boxShadow: theme.shadows.md,
                      border: `${rem(0.4)} solid #ffffff66`,

                      borderRadius: theme.radius.md,
                      zIndex: 1,
                    },
                  },
                  control: {
                    "&:hover": {
                      backgroundColor: theme.colors.blue[9],
                      borderRadius: theme.radius.md,
                    },
                  },
                }}
              >
                {Object.values(howTo).map((item) => (
                {Object.values(howTo).map((item) => (
                  <Accordion.Item value={item.title} key={item.id}>
                    <Accordion.Control className="text-white">
                      <div className="w-full font-bold">
                        {" "}
                        <span className="flex items-center gap-2">
                          <Icon icon={item.icon} />
                          {item.title}
                        </span>
                      </div>
                    </Accordion.Control>


                    <Accordion.Panel className="text-white">
                      <div className="w-full">{item.content}</div>
                      {item.readMore && (
                        <Link
                          className="text-blue-400 hover:text-blue-200"
                          href={item.readMore}
                        >
                          Read More
                        </Link>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default How;
