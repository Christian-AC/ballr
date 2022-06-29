import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetAllALbums } from '../../store/album'
import './AllAlbums.css'
import CreateAlbum from '../CreateAlbum'

const AllAlbums = () => {
  const dispatch = useDispatch();

  const [albums, setAlbums] = useState([])

  const selectorAlbums = useSelector(state => state.albums)

  useEffect(() => {
     dispatch(thunkGetAllALbums())
  }, [dispatch])


  useEffect(()=>{
    if(selectorAlbums){
      console.log(selectorAlbums)
      setAlbums(Object.values(selectorAlbums))
    }
  },[selectorAlbums])

  return (
    <div id="albums-container">
      <div id="single-album">
        { albums.map((album) => {
          return (
            <NavLink key={album.id} to={`/albums/${album.id}`}>
                <img
                className="AllImages" src={album.imageUrl} alt='some value'
              ></img>
            </NavLink>
          );
        })}
      </div>
      <CreateAlbum />
    </ div>
  )
}

export default AllAlbums;