import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkCreateImage } from '../../store/images';


function UploadImage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user?.id);
    const selectorAlbums = useSelector(state => state.albums);

    const [content, setContent] = useState('');
    const [albumId, setAlbumId] = useState('1');
    const [albums, setAlbums] = useState([])
    const [image, setImage] = useState(null);
    const updateAlbum = (e) => setAlbumId(e.target.value);

    useEffect(()=>{
        if(selectorAlbums){
          setAlbums(Object.values(selectorAlbums))
        }
      },[selectorAlbums])



    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const imageInfo = {
            content,
            image,
            userId,
            albumId
        }
        console.log("-----------",imageInfo)
        const photo = await dispatch(thunkCreateImage(imageInfo));
        history.push(`/image/${photo.id}`);
    }

    const handleCancelSubmit = async (e) => {
        e.preventDefault();
        setContent('');
        setImage(null);
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    }

    return (

        <div>
            <div>
                <div>
                    <button onClick={() => history.goBack()}><i className="fa-solid fa-circle-arrow-left"></i>Back</button>
                </div>
                <div>
                    <h2>Upload your image</h2>
                    <div >
                    </div>
                    <form  onSubmit={handleOnSubmit}>
                        <div className='up-form-input'>
                            <label>

                                <input  type="text" value={content} placeholder='Enter a title' onChange={e => setContent(e.target.value)} />

                            </label>
                            <select value={albumId} onChange={updateAlbum} >
                                { albums.map((album) => {
                                return (
                                    <option key={album.id} value={album.id} >
                                    {album.title}
                                    </option>
                                );
                                })}
                            </select>
                            <div className='box'>
                                <input type='file' onChange={updateFile}/>
                          </div>

                        </div>

                        <button variant="primary" type="submit">
                            Submit
                        </button>
                    </form>
                    <div>
                    <button onClick={handleCancelSubmit}>
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UploadImage;
