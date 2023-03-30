import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
import './images.css'
import Banner from '../SearchBar';


const AllImages = () => {
  const dispatch = useDispatch();

  // const [images, setImages] = useState([])

  const selectorImages = useSelector(state => state.images)
  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector((state) => Object.values(state.images))

  useEffect(() => {
     dispatch(thunkGetAllImages())
  }, [dispatch])


  // useEffect(()=>{
  //   if(selectorImages){
  //     setImages(Object.values(selectorImages))
  //   }
  // },[selectorImages])

  return (
    <div>
    <div id="allImages-container">
      <h1 id="images-title">Explore Images</h1>
      <Banner/>
      <div id="image-container">
        { images.map((image) => {
          return (
            <div id="single-image" key={image.id}>
              <NavLink key={image.id} to={`/images/${image.id}`}>
                  <img
                  className="AllImages" src={image.imageUrl}
                ></img>
              </NavLink>
                {/* <h2>{image.content}</h2> */}
            </div>
          );
        })}
      </div>
    </ div>
      {/* {sessionUser ? <CreateImage /> : null} */}
    </div>
  )
}

export default AllImages;
