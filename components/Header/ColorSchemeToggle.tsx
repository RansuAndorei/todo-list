"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import classes from "./Header.module.css";

export default function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="default"
      onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
      className={classes.darkModeToggler}
    >
      {"dark" === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />}
    </ActionIcon>
  );
}
