import './App.css';
import { Photos } from './Photos';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <div className='content'>
      <Photos />
      {window.innerWidth > 768 ? (
        <Sidebar />
      ) : (
        <dialog className="sidebar-dialog">
          <Sidebar />
        </dialog>
      )}

    </div >
  );
}

export default App;
