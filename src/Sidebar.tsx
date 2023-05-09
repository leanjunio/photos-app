import { FileDetails } from "./FileDetails";
import InfoRow from "./InfoList";
import { Section } from "./components/Section/Section";
import { Photo, usePhotosStore } from "./photos";
import { bytesToMB, displayFullDate } from "./utils";
import { ReactComponent as Like } from "./like.svg"

type SidebarProps = {
  currentPhoto?: Photo;
}

export function Sidebar({ currentPhoto }: SidebarProps) {
  const { deletePhoto, like } = usePhotosStore(state => ({ deletePhoto: state.deletePhoto, like: state.like }));

  const infoSectionData = [
    {
      label: 'Uploaded by',
      value: currentPhoto?.uploadedBy ?? ''
    },
    {
      label: 'Created',
      value: currentPhoto?.createdAt ? displayFullDate(currentPhoto?.createdAt) : ''
    },
    {
      label: 'Last modified',
      value: currentPhoto?.updatedAt ? displayFullDate(currentPhoto?.updatedAt) : ''
    }, {
      label: 'Dimensions',
      value: currentPhoto?.dimensions ? `${currentPhoto?.dimensions.width} x ${currentPhoto?.dimensions.height}` : ''
    }, {
      label: 'Resolution',
      value: currentPhoto?.resolution ? `${currentPhoto?.resolution.width} x ${currentPhoto?.resolution.height}` : ''
    }
  ];


  if (!currentPhoto) {
    return (
      <p>Click on a photo</p>
    )
  }

  console.log({ favorited: currentPhoto.favorited })
  return (
    <div aria-label="sidebar">
      <img className='highlight' src={currentPhoto.url} alt={currentPhoto.filename} />
      <div className='file-details'>
        <FileDetails
          filename={currentPhoto.filename}
          size={bytesToMB(currentPhoto.sizeInBytes)}
        />
        <div>
          <button onClick={() => like(currentPhoto.id)}>
            <Like stroke="#4f47dc" fill={currentPhoto.favorited ? '#4f47dc' : 'none'} />
          </button>
        </div>
      </div>
      <div className='information section'>
        <h3 className='label'>Information</h3>
        {infoSectionData.map((info, i) => (
          <InfoRow key={i} label={info.label} value={info.value} />
        ))}
      </div>
      <Section label='Description'>
        <p className='gray description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button onClick={() => deletePhoto(currentPhoto.id)} className='button black'>
          Delete
        </button>
      </Section>
    </div>
  )
}