export default function Page({ params }: { params: { projectId: string } }) {
  return <div>ID: {params.projectId}</div>;
}
