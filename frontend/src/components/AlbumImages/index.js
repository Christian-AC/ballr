import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllImages } from '../../store/images';

const AlbumImages = ({albumId}) => {
  const dispatch = useDispatch();

  const images = useSelector(state => {
    return Object.values(state.images).filter(image => image.albumId === albumId);
  })

  useEffect(() => {
    async function getImages() {
      await dispatch(thunkGetAllImages(albumId))
    }
    getImages();
  }, [dispatch,albumId])


  return (
    <main>
      <h1> testing</h1>
      <div className="comment-detail">
        { images.map((image) => {
          return (
            <h1>{image.content}</h1>
          );
        })}
      </ div>
    </main>
  );

}

export default AlbumImages;
