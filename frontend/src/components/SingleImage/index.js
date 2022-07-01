import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { thunkGetImage, thunkDeleteImage, thunkGetAllImages} from '../../store/images'
import UpdateImage from './EditButton';
import './SingleImage.css'


const SingleImage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { imageId } = useParams();
  const userId = useSelector(state => state.session.user.id);

  const images = useSelector(state => state.images[imageId])

  useEffect(() => {
    dispatch(thunkGetAllImages())
 }, [dispatch])

  useEffect(() => {
    async function getImages() {
      try{
        await dispatch(thunkGetImage(images))
      } catch (err){
        console.log("This photo doens't exist at this time ")
        history.push('/images')
      }
    }
    getImages()
  }, [dispatch, images])

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteImage(images));
    history.push("/images");
}

  return (
    <div className="single-image-container">
      <img id="single-img"
        className="AllImages" src={images.imageUrl} alt="some-value"
        ></img>
        <h1>{images.content}</h1>
      {images.userId === userId ? <button className="delete" onClick={handleDelete}>Delete Photo</button> : null}
      {images.userId === userId ? <UpdateImage /> : null}
    </div>
  )
}


export default SingleImage;
