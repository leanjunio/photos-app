import { useEffect, useState } from "react";
import { usePhotosStore } from "./photos";
import { Tab } from "./components/Tab";
import { PhotoGrid } from "./PhotoGrid";

export function Photos() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { fetch, photos, loading, focus } = usePhotosStore();

  const tabs = ['Recently Added', 'Favorited'];

  const favorites = photos.filter(photo => photo.favorited);

  const lists = [photos, favorites];

  useEffect(() => {
    fetch();
  }, [fetch]);

  function onSelect(id: string) {
    focus(id);
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
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={changeTab} />
      <PhotoGrid currentList={lists[activeTab]} onPhotoSelect={onSelect} />
    </div>
  );
}