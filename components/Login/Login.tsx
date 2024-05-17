"use client";

import { handleLogin } from "@/app/log-in/actions";
import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleButton from "./GoogleButton";

type FormType = {
  email: string;
  password: string;
  terms: boolean;
};

const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (data: FormType) => {
    setIsLoading(true);
    try {
      await handleLogin(data.email, data.password);
      notifications.show({
        message: "Sign in successful.",
        color: "green",
      });
      router.push("/todo");
    } catch (e) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoadingOverlay visible={isLoading} />
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Todo List, Log in with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push("/sign-up")}
            >
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl">
              Log in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
