import { FileDetails } from "./FileDetails";
import { Photo, usePhotosStore } from "./photos";
import { bytesToMB } from "./utils";

type PhotoGridProps = {
  currentList: Photo[];
  onPhotoSelect: (id: string) => void;
  selectedPhoto?: string;
}

export function PhotoGrid({ currentList, onPhotoSelect, selectedPhoto }: PhotoGridProps) {
  const current = usePhotosStore(state => state.current);
  return (
    <div aria-label="photo grid" className="content">
      <div className="photos">
        {currentList.map((photo) => (
          <div key={photo.id} className="photo-container" onClick={() => onPhotoSelect(photo.id)}>
            <img className={`photo ${current === photo.id ? 'clicked' : ''}`} src={photo.url} alt={photo.filename} />
            <FileDetails
              filename={photo.filename}
              size={bytesToMB(photo.sizeInBytes)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}