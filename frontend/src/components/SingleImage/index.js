import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { thunkGetImage, thunkDeleteImage} from '../../store/images'
import UpdateImage from './EditButton';
import './SingleImage.css'


const SingleImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { imageId } = useParams();



  const images = useSelector(state => state.images[imageId])


  useEffect(() => {
   dispatch(thunkGetImage(images))
  }, [dispatch])

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteImage(images));
    history.push("/images");
}

  return (
    <div className="image-container">
      <h1>{images.content}</h1>
      <img
        className="AllImages" src={images.imageUrl} alt="some-value"
      ></img>
      <button onClick={handleDelete}>Delete</button>
      <UpdateImage />
    </div>
  )
}


export default SingleImage;