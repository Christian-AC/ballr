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
    <div id="image-container">
      <h1>Explore Images</h1>
      <div>
        { images.map((image) => {
          return (
            <div>
              <NavLink key={image.id} to={`/images/${image.id}`}>
                  <img id="single-image"
                  className="AllImages" src={image.imageUrl} alt='some value'
                ></img>
              </NavLink>
                <h2>{image.content}</h2>
            </div>
          );
        })}
      </div>
      {sessionUser ? <CreateImage /> : null}
    </ div>
  )
}

export default AllImages;
