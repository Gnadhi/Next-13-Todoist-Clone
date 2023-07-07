import Link from "next/link";

export const revalidate = 0;

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <Link href={`/app/project/${params.projectId}/todo/dfdf`}> dfdfdf </Link>
  );
}
