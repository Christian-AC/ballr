import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { thunkGetImage, thunkDeleteImage} from '../../store/images'
import './SingleImage.css'


const SingleImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { imageId } = useParams();

  const userId = useSelector(state => state.session.user?.id);
  const images = useSelector(state => state.images[imageId])


  useEffect(() => {
    async function fetch(){
      await dispatch(thunkGetImage(images))
    }
    fetch();
  }, [dispatch, images])

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteImage(images));
    history.push("/images");
}

  return (
    <div className="image-container">
      <h1>{images.content}</h1>
      <img
        className="AllImages" src={images.imageUrl}
      ></img>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}


export default SingleImage;
