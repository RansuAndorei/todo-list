"use client";

import { Database } from "@/types/supabase";
import { Container, Group, SegmentedControl, Text, Title } from "@mantine/core";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormDataWithZod from "./TodoForm/FormDataWithZod";
import ReactHookForm from "./TodoForm/ReactHookForm";
import ReactHookFormWithZod from "./TodoForm/ReactHookFormWithZod";
import TodoList from "./TodoList";

export type TodoType = Database["public"]["Tables"]["todo_table"]["Row"];

type Props = {
  user: User;
  url: string;
};

const Todo = ({ user, url }: Props) => {
  const router = useRouter();
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  return (
    <Container>
      <Group gap="xl">
        <Title>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "pink", to: "yellow" }}
          >
            Todo List
          </Text>
        </Title>
        <SegmentedControl
          data={[
            { label: "RHF", value: "/todo" },
            { label: "RHF with ZOD", value: "/todo/add-rhf" },
            { label: "Form Data with ZOD", value: "/todo/add-fd" },
          ]}
          defaultValue={url}
          onChange={(value) => router.push(value)}
        />
      </Group>
      {url === "/todo" && (
        <ReactHookForm user={user} setTodoList={setTodoList} />
      )}
      {url === "/todo/add-rhf" && (
        <ReactHookFormWithZod user={user} setTodoList={setTodoList} />
      )}
      {url === "/todo/add-fd" && (
        <FormDataWithZod user={user} setTodoList={setTodoList} />
      )}
      <TodoList user={user} todoList={todoList} setTodoList={setTodoList} />
    </Container>
  );
};

export default Todo;
