
export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("id is a", typeof id, "and its value is", id);

  return <h1>Task {id}</h1>;
}
