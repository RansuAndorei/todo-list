"use client";

import { Database } from "@/types/supabase";
import { Container, Text, Title } from "@mantine/core";
import { User } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export type TodoType = Database["public"]["Tables"]["todo_table"]["Row"];

type Props = {
  user: User;
};

const Todo = ({ user }: Props) => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  return (
    <Container>
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
      <TodoForm user={user} setTodoList={setTodoList} />
      <TodoList user={user} todoList={todoList} setTodoList={setTodoList} />
    </Container>
  );
};

export default Todo;
