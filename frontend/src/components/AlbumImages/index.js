import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllImages } from '../../store/images';
import { NavLink } from 'react-router-dom';

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
      <div className="comment-detail">
        { images.map((image) => {
          return (
            <NavLink key={image.id} to={`/images/${image.id}`}>
                <img
                className="AllImages" src={image.imageUrl} alt='some value'
              ></img>
            </NavLink>
          );
        })}
      </ div>
    </main>
  );

}

export default AlbumImages;
