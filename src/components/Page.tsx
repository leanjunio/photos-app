type PageProps = {
  title: string;
  children: React.ReactNode;
}

export function Page({ title, children }: PageProps) {
  return (
    <div className="page">
      <h1>{title}</h1>
      {children}
    </div>
  )
}