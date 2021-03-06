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
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
     dispatch(thunkGetAllImages())
  }, [dispatch])


  useEffect(()=>{
    if(selectorImages){
      // console.log(selectorImages)
      setImages(Object.values(selectorImages))
    }
  },[selectorImages])

  return (
    <div>
    <div id="allImages-container">
      <h1>Explore Images</h1>
      <div id="image-container">
        { images.map((image) => {
          return (
            <div id="single-image" key={image.id}>
              <NavLink key={image.id} to={`/images/${image.id}`}>
                  <img
                  className="AllImages" src={image.imageUrl} alt='some value'
                ></img>
              </NavLink>
                {/* <h2>{image.content}</h2> */}
            </div>
          );
        })}
      </div>
    </ div>
      {sessionUser ? <CreateImage /> : null}
    </div>
  )
}

export default AllImages;
