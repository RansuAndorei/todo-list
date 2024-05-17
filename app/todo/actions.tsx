"use server";

import { createClient } from "@/utils/supabase/client";

export async function fetchTodo({ userId }: { userId: string }) {
  const supabaseClient = createClient();

  const { data, error } = await supabaseClient
    .from("todo_table")
    .select("*")
    .eq("todo_user_id", userId);
  if (error) throw error;
  return data;
}

export async function addTodo({
  todo,
  userId,
}: {
  todo: string;
  userId: string;
}) {
  const supabaseClient = createClient();

  const { data, error } = await supabaseClient
    .from("todo_table")
    .insert({
      todo_task: todo,
      todo_user_id: userId,
    })
    .select("*")
    .limit(1)
    .single();
  if (error) throw error;

  return data;
}

export async function updateTodo({
  todoId,
  isComplete,
}: {
  todoId: string;
  isComplete: boolean;
}) {
  const supabaseClient = createClient();

  const { error } = await supabaseClient
    .from("todo_table")
    .update({
      todo_is_complete: isComplete,
    })
    .eq("todo_id", todoId);
  if (error) throw error;
}

export async function deleteTodo({ todoId }: { todoId: string }) {
  const supabaseClient = createClient();

  const { error } = await supabaseClient
    .from("todo_table")
    .delete()
    .eq("todo_id", todoId);
  if (error) throw error;
}
