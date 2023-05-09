import './App.css';
import { FileDetails } from './FileDetails';
import InfoRow from './InfoList';
import { Photos } from './Photos';
import { Section } from './components/Section/Section';
import { usePhotosStore } from './photos';
import { bytesToMB } from './utils';

function displayFullDate(date: string) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(dateObj);
  return formattedDate;
}

function App() {
  const { current, photos } = usePhotosStore(state => ({ current: state.current, photos: state.photos }));
  const currentPhoto = photos.find(photo => photo.id === current);

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

  return (
    <div className='content'>
      <Photos />
      <div className="sidebar">
        <div className="image-details">
          {!currentPhoto ? (
            <p>Choose One</p>
          ) : (
            <>
              <img className='highlight' src={currentPhoto.url} alt={currentPhoto.filename} />
              <div className='file-details'>
                <FileDetails
                  filename={currentPhoto.filename}
                  size={bytesToMB(currentPhoto.sizeInBytes)}
                />
                <div>
                  <p>Like</p>
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
                <button className='button black'>
                  Delete
                </button>
              </Section>
            </>
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
