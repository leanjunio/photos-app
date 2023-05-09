type FileDetailsProps = {
  filename: string;
  size: string;
}

export function FileDetails({ filename, size }: FileDetailsProps) {
  return (
    <div>
      <p className='text-label'>{filename}</p>
      <p className="text-normal">{size} MB</p>
    </div>
  )
}