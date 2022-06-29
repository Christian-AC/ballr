import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
import './images.css'
import CreateImage from "../CreateImage"


const AllImages = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([])

  const selectorImages = useSelector(state => state.images)

  useEffect(() => {
     dispatch(thunkGetAllImages())
  }, [dispatch])


  useEffect(()=>{
    if(selectorImages){
      console.log(selectorImages)
      setImages(Object.values(selectorImages))
    }
  },[selectorImages])

  return (
    <div id="image-container">
      <div id="single-image">
        { images.map((image) => {
          return (
            <NavLink key={image.id} to={`/images/${image.id}`}>
                <img
                className="AllImages" src={image.imageUrl} alt='some value'
              ></img>
            </NavLink>
          );
        })}
      </div>
      <CreateImage />
    </ div>
  )
}

export default AllImages;
