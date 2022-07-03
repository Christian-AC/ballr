import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkUpdateAlbum } from '../../store/album'
import { useParams } from 'react-router-dom';



const UpdateAlbum = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const albums = useSelector(state => state.albums[albumId])
  const id = albums.id;
  const userId = useSelector(state => state.session.user?.id);


  const [title, setTitle] = useState(albums.title);
  const [imageUrl, setAlbumUrl] = useState(albums.imageUrl);
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

  //   document.addEventListener('submit', closeMenu);

  //   return () => document.removeEventListener("submit", closeMenu);
  // }, [showMenu]);

  const updateContent = (e) => setTitle(e.target.value);
  const updateAlbum = (e) => setAlbumUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId,

      imageUrl,
      title
    };

    try{
     const createAlbum = await dispatch(thunkUpdateAlbum(payload));
      if (createAlbum) {
        history.push(`/albums/${createAlbum.albums.id}`);
      }
    } catch (error){
       await error.json();
    }
  }
    return (
        <div className="form-container">
          <form onSubmit={handleSubmit} className='edit-album'>
              <h3> Update Pic </h3>
              <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={updateAlbum} />
              <input
                  type="text"
                  placeholder="Caption"
                  value={title}
                  onChange={updateContent} />
              <button id='edit-submit' type="submit">Submit</button>
          </form>
        </div>
          )
}

export default UpdateAlbum;
