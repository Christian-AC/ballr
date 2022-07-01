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
  const sessionUser = useSelector(state => state.session.user);

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
      <h1>Albums</h1>
        { albums.map((album) => {
          return (
            <div id="single-album" key={album.id}>
              <NavLink key={album.id} to={`/albums/${album.id}`}>
                  <img
                  className="AllImages" src={album.imageUrl} alt='some value'
                ></img>
              </NavLink>
                <h2 id="album-titles">{album.title}</h2>
            </div>
          );
        })}
     {sessionUser ? <CreateAlbum /> : null}
    </ div>
  )
}

export default AllAlbums;
