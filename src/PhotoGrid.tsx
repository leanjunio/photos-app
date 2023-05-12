import { FileDetails } from "./FileDetails";
import { Photo, usePhotosStore } from "./photosStore";
import { bytesToMB } from "./utils";

type PhotoGridProps = {
  currentList: Photo[];
  onPhotoSelect: (id: string) => void;
}

export function PhotoGrid({ currentList, onPhotoSelect }: PhotoGridProps) {
  const current = usePhotosStore(state => state.current);
  return (
    <main aria-label="photo grid" className="content">
      {currentList.length === 0 ? <p>No photos found</p> : (
        <div className="photo-grid">
          {currentList.map((photo) => (
            <div key={photo.id} className="photo-grid__wrapper" onClick={() => onPhotoSelect(photo.id)}>
              <img className={`photo-grid__img ${current === photo.id ? 'photo-grid__img--selected' : ''}`} src={photo.url} alt={photo.filename} />
              <FileDetails
                filename={photo.filename}
                size={bytesToMB(photo.sizeInBytes)}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}