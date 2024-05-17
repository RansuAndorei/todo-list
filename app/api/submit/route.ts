import { addTodo } from "@/app/todo/actions";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  todo: z
    .string()
    .min(1, { message: "Todo is required" })
    .max(4000, { message: "Maximum of 4000 chracter" }),
  userId: z.string(),
});

export async function POST(
  req: NextApiRequest & {
    formData: () => Promise<{ get: (name: string) => string }>;
  }
) {
  const formData = await req.formData();
  const todo = formData.get("todo");
  const userId = formData.get("userId");

  const parsed = schema.parse({ todo, userId });

  const data = await addTodo({
    todo: parsed.todo,
    userId: parsed.userId,
  });

  return NextResponse.json(data);
}
