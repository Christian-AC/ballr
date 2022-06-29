import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateImage } from '../../store/images'
import './CreateImage.css'


const CreateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user.id);
  const albumId = useSelector(state => state.session.album?.id)

  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const updateContent = (e) => setContent(e.target.value);
  const updateImage = (e) => setImageUrl(e.target.value);

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
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateImage} />
            <input
                type="text"
                placeholder="Caption"
                value={content}
                onChange={updateContent} />
            <button type="submit">Create new pic</button>
        </form>
      </div>
          )
}

export default CreateImage;
