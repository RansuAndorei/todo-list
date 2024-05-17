"use client";

import { Button, Group, Paper, Stack, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction, useState } from "react";
import { TodoType } from "../Todo";

type Props = {
  user: User;
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
};

const FormDataWithZod = ({ user, setTodoList }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  formData.append("todo", "");
  formData.append("userId", user.id);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formData.set(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setTodoList((prev) => [...prev, data]);
      formData.set("todo", "");
      notifications.show({
        message: "Todo Added",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper shadow="xs" p="xl" mt="xl">
      <form onSubmit={handleSubmit} id="todoForm">
        <Stack>
          <Textarea
            label="Todo"
            placeholder="Type here your todo"
            autosize
            minRows={2}
            maxRows={4}
            required
            name="todo"
            onChange={handleChange}
          />
          <Group justify="flex-end">
            <Button w={200} type="submit" loading={isLoading}>
              Add
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default FormDataWithZod;
