// app/(admin)/documentation/[slug]/page.tsx
import DetailEditDocumentation from "./DetailEditDocumentation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DocumentationDetailPage({ params }: Props) {
  const { slug } = await params;
  return <DetailEditDocumentation slug={slug}  />;
}
