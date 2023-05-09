type FileDetailsProps = {
  filename: string;
  size: string;
}

export function FileDetails({ filename, size }: FileDetailsProps) {
  return (
    <div>
      <p className='label'>{filename}</p>
      <p className="subtext">{size} MB</p>
    </div>
  )
}