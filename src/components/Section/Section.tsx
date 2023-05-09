
import "./index.css"

type SectionProps = {
  label: string;
  children: React.ReactNode;
};

export function Section({ label, children }: SectionProps) {
  return (
    <div className="section">
      <h3 className="label">{label}</h3>
      {children}
    </div>
  );
}