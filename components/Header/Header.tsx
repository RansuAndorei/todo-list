import { createClient } from "@/utils/supabase/server";
import { Box, Button, Group, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import Link from "next/link";
import ColorSchemeToggle from "./ColorSchemeToggle";
import classes from "./Header.module.css";
import { handleLogout } from "./actions";

export default async function Header() {
  const supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return (
    <Box pb="xl">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <MantineLogo size={30} />
            <Group>
              <ColorSchemeToggle />
            </Group>
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            {user && (
              <a href="/todo" className={classes.link}>
                Todo List
              </a>
            )}
          </Group>

          <Group visibleFrom="sm">
            {!user && (
              <>
                <Link href="/log-in">
                  <Button variant="default">Log in</Button>
                </Link>

                <Link href="/sign-up">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            {user && (
              <>
                <Text>{user.email}</Text>
                <form action={handleLogout}>
                  <Button type="submit">Logout</Button>
                </form>
              </>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
}
