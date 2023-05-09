import { useEffect, useState } from "react";
import { usePhotosStore } from "./photos";

function bytesToMB(bytes: number) {
  return (bytes / 1000000).toFixed(1);
}

export function Photos() {
  const [clicked, setClicked] = useState('');
  const [activeTab, setActiveTab] = useState<number>(1);

  const { fetch, photos, loading, focus } = usePhotosStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  function onSelect(id: string) {
    focus(id);
    setClicked(id);
  }

  function changeTab(tab: number) {
    setActiveTab(tab);
  }

  if (loading) {
    return (
      <div className="page">
        <h1>Photos</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Photos</h1>
      <div className="nav border-b">
        <button className={`link ${activeTab === 1 ? 'wide' : ''}`} onClick={() => changeTab(1)}>
          Recently Added
        </button>
        <button className={`link ${activeTab === 2 ? 'wide' : ''}`} onClick={() => changeTab(2)}>Favorited</button>
      </div>
      <div className="content">
        <div className="photos">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-container" onClick={() => onSelect(photo.id)}>
              <img className={`photo ${clicked === photo.id ? 'clicked' : ''}`} src={photo.url} alt={photo.filename} />
              <p className="label">{photo.filename}</p>
              <p className="subtext">{bytesToMB(photo.sizeInBytes)} MB</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}