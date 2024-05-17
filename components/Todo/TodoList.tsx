"use client";

import { deleteTodo, fetchTodo, updateTodo } from "@/app/todo/actions";
import { Alert, LoadingOverlay, Paper, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/auth-helpers-nextjs";
import { IconMoodEmpty } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TodoType } from "./Todo";
import TodoCard from "./TodoCard";

type Props = {
  user: User;
  todoList: TodoType[];
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
};

const TodoList = ({ user, todoList, setTodoList }: Props) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleFetchTodoList();
  }, []);

  const handleFetchTodoList = async () => {
    try {
      const data = await fetchTodo({ userId: user.id });
      setTodoList(data ?? []);
    } catch (e) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateTodo = async (todoId: string, isComplete: boolean) => {
    try {
      await updateTodo({ todoId, isComplete });
      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.todo_id !== todoId) return todo;
          return {
            ...todo,
            todo_is_complete: isComplete,
          };
        })
      );
    } catch (e) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo({ todoId });
      setTodoList((prev) => prev.filter((todo) => todoId !== todo.todo_id));
    } catch (e) {
      notifications.show({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Paper shadow="xs" p="xl" mt="xl" withBorder pos="relative">
      <LoadingOverlay visible={isFetching} />
      <Stack p="xl">
        {!todoList.length && (
          <Alert
            variant="light"
            color="orange"
            title="Empty todo list"
            icon={<IconMoodEmpty />}
          ></Alert>
        )}
        {todoList.map((todo) => (
          <TodoCard
            key={todo.todo_id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default TodoList;
