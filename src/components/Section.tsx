
type SectionProps = {
  label: string;
  children: React.ReactNode;
};

export function Section({ label, children }: SectionProps) {
  return (
    <div className="section">
      <h3 className="text-label">{label}</h3>
      {children}
    </div>
  );
}