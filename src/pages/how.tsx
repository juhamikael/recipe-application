import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Title, useMantineTheme, rem } from "@mantine/core";
import { Icon } from "@iconify/react";
import Link from "next/link";

type IContent = {
  id: number;
  icon: string;
  content: string;
  title: string;
  readMore?: string;
};

type IHowTo = {
  title: string;
  content: IContent[];
};

const How = () => {
  const [howTo, setHowTo] = useState<IHowTo>();
  const theme = useMantineTheme();

  const effect = () => {
    axios
      .get<IHowTo>("http://localhost:3001/how")
      .then((res) => {
        setHowTo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(effect, []);

  console.log(howTo);
  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="flex w-1/2 flex-col ">
          {howTo && (
            <>
              <Title className="text-3xl font-bold text-white">
                {howTo.title}
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
                {howTo.content.map((item: IContent) => (
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
