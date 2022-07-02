import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateAlbum } from '../../store/album';

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user.id);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const updateTitle = (e) => setTitle(e.target.value);
  const updateImage = (e) => setImageUrl(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      imageUrl,
      title
    };

     const createAlbum = await dispatch(thunkCreateAlbum(payload));
      if (createAlbum) {
        history.push(`/albums/${createAlbum.album.id}`);
      }

  }

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className='create-form'>
            <h3> Create a new album </h3>
            <input
              type="url"
              placeholder="Album Cover URL"
              value={imageUrl}
              onChange={updateImage} />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
                required />
            <button type="submit">Create new pic</button>
        </form>
      </div>
          )
}

export default CreateAlbum;
