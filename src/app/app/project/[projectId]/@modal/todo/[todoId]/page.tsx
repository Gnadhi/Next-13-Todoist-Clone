import { TodoDialog } from "@/components/todo-dialog";

export default async function TodoPage({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  return <TodoDialog />;
}
