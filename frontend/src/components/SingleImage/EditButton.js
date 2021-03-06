import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkUpdateImage } from '../../store/images'
import { useParams } from 'react-router-dom';



const UpdateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { imageId } = useParams();
  const images = useSelector(state => state.images[imageId])
  const id = images.id;
  const userId = useSelector(state => state.session.user?.id);
  const selectorAlbums = useSelector(state => state.albums)

  const [content, setContent] = useState(images.content);
  const [imageUrl, setImageUrl] = useState(images.imageUrl);
  const [albumId, setAlbumId] = useState(images.albumId);
  const [albums, setAlbums] = useState([]);
  // const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

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
      id,
      userId,
      albumId,
      imageUrl,
      content
    };

    await dispatch(thunkUpdateImage(payload));

  }
    return (
      // <>
      // <button onClick={openMenu}>
      //   Edit Picture
      // </button>
      // {showMenu && (
      <div className="form-container">
        <form onSubmit={handleSubmit} className='edit-album'>
            <h3> Update Pic </h3>
            <input
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateImage} />
            <input
                type="text"
                placeholder="Caption"
                value={content}
                onChange={updateContent}
                required />
           <select value={albumId} onChange={updateAlbum} >
            { albums.map((album) => {
              return (
                <option key={album.id} value={album.id} >
                  {album.title}
                </option>
              );
            })}
          </select>
            <button id='edit-submit' type="submit">Submit</button>
        </form>
      </div>
      // )}
      // </>
          )
}

export default UpdateImage;
