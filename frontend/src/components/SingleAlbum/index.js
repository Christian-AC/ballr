import { useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { thunkGetImage } from '../../store/images'
import { thunkGetAlbum, thunkDeleteAlbum } from '../../store/album'
import UpdateAlbum from './EditButton';
import './SingleAlbum.css'
import AllImages from '../AllImages';


const SingleAlbum = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const albums = useSelector(state => state.albums[albumId])


  const [images, setImages] = useState([])
  const selectorImages = useSelector(state => state.images)


  useEffect(()=>{
    if(selectorImages){
      console.log(selectorImages)
      setImages(Object.values(selectorImages))
    }
  },[selectorImages])

  useEffect(() => {
    async function getAlbum() {
    await dispatch(thunkGetAlbum(albums))
    }
    getAlbum()
  }, [dispatch])

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteAlbum(albums));
    history.push("/albums");
}

  return (
    <div className="image-container">
      <h1>{albums.content}</h1>
      <img
        className="AllImages" src={albums.imageUrl} alt="some-value"
      ></img>
        <button onClick={handleDelete}>Delete</button>
      <div>
      { images.map((image) => {
          return (
            <NavLink key={image.id} to={`/images/${image.id}`}>
                <img
                className="AllImages" src={image.imageUrl} alt='some value'
              ></img>
            </NavLink>
          );
        })}
        </div>
      <UpdateAlbum />
    </div>
  )
}


export default SingleAlbum;
