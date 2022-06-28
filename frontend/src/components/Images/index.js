import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
import './images.css'


const AllImages = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([])

  const selectorImages = useSelector(state => state.images)

  useEffect(() => {
    dispatch(thunkGetAllImages())
  }, [dispatch])

  useEffect(() => {
    console.log('effect images', images)
  }, [images])

  useEffect(()=>{
    if(selectorImages){
      console.log(selectorImages)
      setImages(Object.values(selectorImages))
    }
  },[selectorImages])

  return (
    <div id="image-container">
          { images.map((image) => {
            return (
              <NavLink key={image.id} to={`/photos/${image.id}`}>
                  <img
                  className="AllImages" src={image.imageUrl}
                ></img>
              </NavLink>
            );
          })}
        </ div>
  )
}

export default AllImages;
