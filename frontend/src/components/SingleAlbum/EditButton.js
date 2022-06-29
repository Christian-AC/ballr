import { useState } from 'react';
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


  const [content, setContent] = useState(albums.title);

  const [imageUrl, setImageUrl] = useState(albums.imageUrl);

  const updateContent = (e) => setContent(e.target.value);
  const updateAlbum = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId,

      imageUrl,
      content
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
        <form onSubmit={handleSubmit} className='create-form'>
            <h3> Update Pic </h3>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateAlbum} />
            <input
                type="text"
                placeholder="Caption"
                value={content}
                onChange={updateContent} />
            <button type="submit">Edit Picture</button>
        </form>
      </div>
          )
}

export default UpdateAlbum;
