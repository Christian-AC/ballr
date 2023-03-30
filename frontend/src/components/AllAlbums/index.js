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

      setAlbums(Object.values(selectorAlbums))
    }
  },[selectorAlbums])

  return (
    <div>
    <div id="albums-container">
      <h1>Explore Albums</h1>
      <div id="all-albums">
        { albums.map((album) => {
          return (
            <div id="single-album" key={album.id}>
              <NavLink key={album.id} to={`/albums/${album.id}`}>
                  <img
                  className="AllImages" src={album.imageUrl} 
                ></img>
              </NavLink>
                <h2 id="album-titles">{album.title}</h2>
            </div>
          );
        })}
        </div>
    </ div>
     {sessionUser ? <CreateAlbum /> : null}
</div>
  )
}

export default AllAlbums;
