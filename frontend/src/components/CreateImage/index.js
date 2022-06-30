import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateImage } from '../../store/images'
import './CreateImage.css'


const CreateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user.id);
  const selectorAlbums = useSelector(state => state.albums);
  // const albumName = useSelector(state => state.session.album.id)

  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [albums, setAlbums] = useState([])
  const updateContent = (e) => setContent(e.target.value);
  const updateImage = (e) => setImageUrl(e.target.value);
  const updateAlbum = (e) => setAlbumId(e.target.value);

  useEffect(()=>{
    if(selectorAlbums){
      setAlbums(Object.values(selectorAlbums))
    }
  },[selectorAlbums])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      albumId,
      imageUrl,
      content
    };

    try{
     const createImage = await dispatch(thunkCreateImage(payload));
      if (createImage) {
        history.push(`/images/${createImage.images.id}`);
      }
    } catch (error){
      await error.json();
    }
  }
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className='create-form'>
            <h3> Upload a new image </h3>
            <input
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateImage} />
            <input
                type="text"
                placeholder="Caption"
                value={content}
                onChange={updateContent} />
          <select value={albumId} onChange={updateAlbum} >
            { albums.map((album) => {
              return (
                <option key={album.id} value={album.id} >
                  {album.title}
                </option>
              );
            })}
          </select>
            <button type="submit">Create new pic</button>
        </form>
      </div>
          )
}

export default CreateImage;
