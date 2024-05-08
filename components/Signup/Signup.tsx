"use client";

import { handleSignUp, handleSignUpOAuth } from "@/app/sign-up/actions";
import {
  Anchor,
  Button,
  Checkbox,
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
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleButton from "../Login/GoogleButton";

type FormType = {
  email: string;
  name: string;
  password: string;
  terms: boolean;
};

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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

  const signUpOAuth = async (provider: Provider) => {
    setIsLoading(true);
    try {
      await handleSignUpOAuth(provider);
    } catch {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: FormType) => {
    if (!data.terms) {
      notifications.show({
        message:
          "You need to accept the terms and conditions before signing up",
        color: "orange",
      });
      return;
    }
    setIsLoading(true);
    try {
      await handleSignUp(data.email, data.password);
      notifications.show({
        message:
          "Confirmation email sent. Please check your email inbox to proceed.",
        color: "green",
        withCloseButton: false,
      });
      form.reset();
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
          Welcome to Todo List, Sign up in with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={() => signUpOAuth("google")}>
            Google
          </GoogleButton>
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
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />

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
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push("/log-in")}
            >
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl">
              Sign up
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
