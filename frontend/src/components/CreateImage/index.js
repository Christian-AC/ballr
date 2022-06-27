import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateImage } from '../../store/images'
import './CreateImage.css'


export default function CreateImage(){
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const updateContent = (e) => setContent(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      albumId,
      imageUrl,
      content
    };

    let createImage
    try{
      createImage = await dispatch(thunkCreateImage(payload));
      if(createImage) {
        history.push(`/images/${createImage.image.id}`)
      }
    }

  }
}
