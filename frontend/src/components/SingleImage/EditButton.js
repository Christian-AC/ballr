import { useState } from 'react';
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
  const albumId = useSelector(state => state.session.album?.id)

  const [content, setContent] = useState(images.content);
  const [imageUrl, setImageUrl] = useState(images.imageUrl);

  const updateContent = (e) => setContent(e.target.value);
  const updateImage = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId,
      albumId,
      imageUrl,
      content
    };

    try{
     const createImage = await dispatch(thunkUpdateImage(payload));
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
            <h3> Update Pic </h3>
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
            <button type="submit">Edit Picture</button>
        </form>
      </div>
          )
}

export default UpdateImage;
