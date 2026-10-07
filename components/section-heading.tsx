export function SectionHeading({ title, lead, id }: { title: string; lead?: string; id?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="h2 whitespace-pre-line">{title}</h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}
