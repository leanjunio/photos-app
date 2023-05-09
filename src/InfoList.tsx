type InfoRowProps = {
  label: string;
  value: string;
};

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="information__column">
      <p className='gray'>{label}</p>
      <p className='dark'>{value}</p>
    </div>
  )
}