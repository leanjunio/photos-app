import { FileDetails } from "./FileDetails";
import InfoRow from "./InfoList";
import { Section } from "./components/Section";
import { usePhotosStore } from "./photosStore";
import { bytesToMB, displayFullDate } from "./utils";
import { ReactComponent as Like } from "./like.svg"

export function Sidebar() {
  const { current, photos, deletePhoto, toggleLike } = usePhotosStore(state => ({
    current: state.current,
    photos: state.photos,
    deletePhoto: state.deletePhoto,
    toggleLike: state.toggleLike
  }));
  const currentPhoto = photos.find(photo => photo.id === current);

  const infoSectionData = [
    {
      label: 'Uploaded by',
      value: currentPhoto?.uploadedBy ?? ''
    },
    {
      label: 'Created',
      value: currentPhoto?.createdAt ? displayFullDate(currentPhoto.createdAt) : ''
    },
    {
      label: 'Last modified',
      value: currentPhoto?.updatedAt ? displayFullDate(currentPhoto.updatedAt) : ''
    }, {
      label: 'Dimensions',
      value: currentPhoto?.dimensions ? `${currentPhoto.dimensions.width} x ${currentPhoto.dimensions.height}` : ''
    }, {
      label: 'Resolution',
      value: currentPhoto?.resolution ? `${currentPhoto.resolution.width} x ${currentPhoto.resolution.height}` : ''
    }
  ];

  return (
    <aside className="sidebar">
      <div aria-label="sidebar" className="sidebar__wrapper">
        {!currentPhoto ? <p>Click on a photo</p> : (
          <>
            <img className='sidebar__image' src={currentPhoto.url} alt={currentPhoto.filename} />
            <div className='sidebar__file'>
              <FileDetails
                filename={currentPhoto.filename}
                size={bytesToMB(currentPhoto.sizeInBytes)}
              />
              <div>
                <button className="mt-8" onClick={() => toggleLike(currentPhoto.id)}>
                  <Like aria-label="like button" stroke="#4f47dc" fill={currentPhoto.favorited ? '#4f47dc' : 'none'} />
                </button>
              </div>
            </div>
            <section className='sidebar__information'>
              <h3 className='text-label'>Information</h3>
              {infoSectionData.map((info, i) => (
                <InfoRow key={i} label={info.label} value={info.value} />
              ))}
            </section>
            <Section label='Description'>
              <p className='text-normal sidebar__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              {window.innerWidth <= 768 && (
                <button onClick={() => {
                  (document.querySelector('.sidebar-dialog') as HTMLDialogElement)?.close();
                }} className='sidebar__delete'>
                  Cancel
                </button>
              )}

              <button onClick={() => deletePhoto(currentPhoto.id)} className='sidebar__delete'>
                Delete
              </button>
            </Section>
          </>
        )}
      </div>
    </aside>
  )
}