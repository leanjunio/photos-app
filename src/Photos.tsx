import { useEffect, useState } from "react";
import { usePhotosStore } from "./photos";
import { bytesToMB } from "./utils";
import { FileDetails } from "./FileDetails";
import { Tab } from "./components/Tab/Tab";
import { PhotoGrid } from "./PhotoGrid";

export function Photos() {
  const [clicked, setClicked] = useState('');
  const [activeTab, setActiveTab] = useState<number>(0);

  const { fetch, photos, loading, focus } = usePhotosStore();

  const tabs = ['Recently Added', 'Favorited'];

  const favorites = photos.filter(photo => photo.favorited);

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

  const currentList = activeTab === 1 ? photos : favorites;

  return (
    <div className="page">
      <h1>Photos</h1>
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={changeTab} />
      <PhotoGrid currentList={currentList} onPhotoSelect={onSelect} selectedPhoto={clicked} />
    </div>
  );
}