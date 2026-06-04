export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page section-padding py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: {updated}</p>
        <div className="prose-invert mt-8 space-y-6 text-sm leading-relaxed text-text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_a]:text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
}
