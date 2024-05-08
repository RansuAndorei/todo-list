"use client";

import { addTodo } from "@/app/todo-list/actions";
import { Button, Group, Paper, Stack, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { TodoType } from "./Todo";

type Props = {
  user: User;
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
};

const TodoForm = ({ user, setTodoList }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<{
    todo: string;
  }>();

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
            {...register("todo", {
              required: `Todo is required`,
              maxLength: {
                value: 400,
                message: `Maximum of ${400} characters`,
              },
            })}
            autosize
            minRows={2}
            maxRows={4}
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

export default TodoForm;
