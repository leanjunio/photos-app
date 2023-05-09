import './App.css';
import { Photos } from './Photos';
import { usePhotosStore } from './photos';

function bytesToMB(bytes: number) {
  return (bytes / 1000000).toFixed(1);
}

function displayFullDate(date: string) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(dateObj);
  return formattedDate;
}

function App() {
  const { current, photos } = usePhotosStore(state => ({ current: state.current, photos: state.photos }));
  const currentPhoto = photos.find(photo => photo.id === current);

  return (
    <div className='content'>
      <Photos />
      {!currentPhoto ? (
        <div className="sidebar">
          Choose One
        </div>
      ) : (
        <div className="sidebar">
          <div className="image-details">
            <img className='highlight' src={currentPhoto.url} alt={currentPhoto.filename} />
            <div className='file-details'>
              <div>
                <p className='label'>{currentPhoto.filename}</p>
                <p className="subtext">{bytesToMB(currentPhoto.sizeInBytes)} MB</p>
              </div>
              <div>
                <p>Like</p>
              </div>
            </div>
            <div className='information section'>
              <h3 className='label'>Information</h3>
              <div className="columns">
                <p className='gray'>Uploaded by</p>
                <p className='dark'>{currentPhoto.uploadedBy}</p>
              </div>
              <div className="columns">
                <p className='gray'>Created</p>
                <p className='dark'>{displayFullDate(currentPhoto.createdAt)}</p>
              </div>
              <div className="columns">
                <p className='gray'>Last modified</p>
                <p className='dark'>{displayFullDate(currentPhoto.updatedAt)}</p>
              </div>
              <div className="columns">
                <p className='gray'>Dimensions</p>
                <p className='dark'>{currentPhoto.dimensions.width} x {currentPhoto.dimensions.height}</p>
              </div>
              <div className="columns border-b">
                <p className='gray'>Resolution</p>
                <p className='dark'>{currentPhoto.resolution.width} x {currentPhoto.resolution.height}</p>
              </div>
            </div>
            <div className='section'>
              <h3 className='label'>Description</h3>
              <p className='gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <button className='button black'>
              Delete
            </button>
          </div>
        </div>
      )}
    </div >
  );
}

export default App;
