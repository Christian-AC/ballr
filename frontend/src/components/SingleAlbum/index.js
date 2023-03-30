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
  }, [dispatch])

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteAlbum(albums));
    history.push("/albums");
}

  return (
  <div>
    <div id="single-album-container">
        <h1>{albums.title} Album</h1>
      <div id='album-container'>
        <img
        className="album-cover" src={albums.imageUrl}
        ></img>
        <div id="edit-delete">
        {albums.userId === userId ? <UpdateAlbum /> : null}
        {albums.userId === userId ? <button className="delete" onClick={handleDelete}>Delete Album</button> : null}
        </div>
      </div >
    </div>
    <div className="allImagescontainer">
        <AlbumImages albumId={albums.id} />
    </div>
  </div>
  )
}


export default SingleAlbum;
