"use client";

import { addTodo } from "@/app/todo/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Paper, Stack, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TodoType } from "../Todo";

const schema = z.object({
  todo: z
    .string()
    .min(1, { message: "Todo is required" })
    .max(4000, { message: "Maximum of 4000 chracter" }),
});

type Props = {
  user: User;
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
};

const ReactHookFormWithZod = ({ user, setTodoList }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<{ todo: string }>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ todo }: { todo: string }) => {
    if (!todo) return;
    try {
      const data = await addTodo({ todo: todo.trim(), userId: user.id });
      setTodoList((prev) => [...prev, data]);
      setValue("todo", "");
      notifications.show({
        message: "Todo Added",
        color: "green",
      });
    } catch (e) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    }
  };

  return (
    <Paper shadow="xs" p="xl" mt="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Textarea
            label="Todo"
            placeholder="Type here your todo"
            {...register("todo")}
            autosize
            minRows={2}
            maxRows={4}
            error={errors?.todo?.message}
          />
          <Group justify="flex-end">
            <Button w={200} type="submit" loading={isSubmitting}>
              Add
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default ReactHookFormWithZod;
