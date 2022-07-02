import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { thunkGetAlbum, thunkDeleteAlbum } from '../../store/album'
import UpdateAlbum from './EditButton';
import './SingleAlbum.css'
import AlbumImages from '../AlbumImages';


const SingleAlbum = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const albums = useSelector(state => state.albums[albumId])
  const userId = useSelector(state => state.session.user.id);


  // const [images, setImages] = useState([])
  // const selectorImages = useSelector(state => state.images)


  // useEffect(()=>{
  //   if(selectorImages){
  //     setImages(Object.values(selectorImages))
  //   }
  // },[selectorImages])

  useEffect(() => {
    async function getAlbum() {
    await dispatch(thunkGetAlbum(albums))
    }
    getAlbum()
    // eslint-disable-next-line
  }, [dispatch])

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteAlbum(albums));
    history.push("/albums");
}

  return (
    <div id="single-album-container">
      <div id='album-container'>
        <h1>{albums.title}</h1>
        <img
        className="album-cover" src={albums.imageUrl} alt="some-value"
        ></img>
        {albums.userId === userId ? <button className="delete-album" onClick={handleDelete}>Delete Album</button> : null}
        {albums.userId === userId ? <UpdateAlbum /> : null}
      </div >
        <AlbumImages albumId={albums.id} />
    </div>
  )
}


export default SingleAlbum;
