import { useEffect, useState } from "react";
import { usePhotosStore } from "./photosStore";
import { Tab } from "./components/Tab";
import { PhotoGrid } from "./PhotoGrid";
import { Page } from "./components/Page";

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

  return (
    <Page title="Photos">
      {loading ? (<p>Loading...</p>) : (
        <>
          <Tab tabs={tabs} activeTab={activeTab} onTabChange={changeTab} />
          <PhotoGrid currentList={lists[activeTab]} onPhotoSelect={onSelect} />
        </>
      )}
    </Page>
  );
}