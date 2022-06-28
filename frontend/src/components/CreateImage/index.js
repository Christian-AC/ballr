import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateImage } from '../../store/images'
import './CreateImage.css'


const CreateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user?.id);
  const albumId = useSelector(state => state.session.album?.id)

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const updateContent = (e) => setContent(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      albumId,
      image,
      content
    };

    let createImage
    try{
      createImage = await dispatch(thunkCreateImage(payload));
    } catch (error){
      const err = await err.json();
    }

    if(createImage) {
      history.push(`/images/${createImage.id}`)
    }
  }
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className='create-form'>
            <h3> Upload a new pic </h3>
            <input
              type="text"
              placeholder="Image URL"
              value={image}
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
