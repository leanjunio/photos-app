import './App.css';
import { Photos } from './Photos';
import { Sidebar } from './Sidebar';
import { usePhotosStore } from './photosStore';

function App() {
  return (
    <div className='content'>
      <Photos />
      <Sidebar currentPhoto={currentPhoto} />
    </div >
  );
}

export default App;
