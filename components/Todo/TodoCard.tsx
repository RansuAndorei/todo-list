"use client";

import { ActionIcon, Group, Text, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconCircle,
  IconCircleDashed,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { TodoType } from "./Todo";

type Props = {
  todo: TodoType;
  handleDeleteTodo: (todoId: string) => void;
  handleUpdateTodo: (todoId: string, isComplete: boolean) => void;
};

const TodoCard = ({ todo, handleDeleteTodo, handleUpdateTodo }: Props) => {
  return (
    <Group key={todo.todo_id} align="center" justify="space-between">
      <Group align="center" justify="center">
        <ThemeIcon
          color={todo.todo_is_complete ? "green" : "blue"}
          size={24}
          radius="xl"
        >
          {todo.todo_is_complete ? (
            <IconCircle style={{ width: 16, height: 16 }} />
          ) : (
            <IconCircleDashed style={{ width: 16, height: 16 }} />
          )}
        </ThemeIcon>
        <Text td={todo.todo_is_complete ? "line-through" : ""}>
          {todo.todo_task}
        </Text>
      </Group>
      <Group align="center" justify="center">
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => {
            handleDeleteTodo(todo.todo_id);
          }}
        >
          <IconTrash color="red" size={16} />
        </ActionIcon>
        {todo.todo_is_complete ? (
          <ActionIcon
            variant="light"
            color="orange"
            onClick={() => {
              handleUpdateTodo(todo.todo_id, false);
            }}
          >
            <IconX color="orange" size={16} />
          </ActionIcon>
        ) : (
          <ActionIcon
            variant="light"
            color="green"
            onClick={() => {
              handleUpdateTodo(todo.todo_id, true);
            }}
          >
            <IconCheck color="green" size={16} />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
};

export default TodoCard;
