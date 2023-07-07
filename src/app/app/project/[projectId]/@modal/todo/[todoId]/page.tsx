export default function Page({ params }: { params: { todoId: string } }) {
  return <h1>{params.todoId}</h1>;
}
