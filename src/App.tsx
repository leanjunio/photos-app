import './App.css';
import { Photos } from './Photos';
import { Sidebar } from './Sidebar';
import { usePhotosStore } from './photos';

function App() {
  const { current, photos } = usePhotosStore(state => ({ current: state.current, photos: state.photos }));
  const currentPhoto = photos.find(photo => photo.id === current);

  return (
    <div className='content'>
      <Photos />
      <Sidebar currentPhoto={currentPhoto} />
    </div >
  );
}

export default App;
