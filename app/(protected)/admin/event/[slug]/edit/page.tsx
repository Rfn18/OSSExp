import EditEvent from "./EditEvent";

interface EventEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventEditPage({ params }: EventEditPageProps) {
  const { slug } = await params;
  console.log(slug);

  return <EditEvent slug={slug} />;
}
