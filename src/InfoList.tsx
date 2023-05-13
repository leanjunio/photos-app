type InfoRowProps = {
  label: string;
  value: string;
};

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="information__column">
      <p className='information__label'>{label}</p>
      <p className='information__value'>{value}</p>
    </div>
  )
}