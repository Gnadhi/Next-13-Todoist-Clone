import { Todo, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Todo[]> {
  // Fetch data from your API here.
  return [
    {
      id: "dfdf",
      amount: 1,
      email: "dfdf",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
