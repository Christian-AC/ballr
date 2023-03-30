import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { thunkGetAllImages } from '../../store/images';



function SearchPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const url = window.location.href.split("/");
    const {searchValue} = useParams()

    const user = useSelector((state) => state.session.user)
    const images = useSelector((state) => Object.values(state.images))
    const searchImages = images?.filter((images) => images.content.toUpperCase().includes(searchValue.toUpperCase()))

    useEffect(() => {
        dispatch(thunkGetAllImages())
     }, [dispatch])



    return (
        <>
        <h1 className='images-list-header'>{searchImages?.length} {searchImages?.length === 1 ? 'result' : 'results'} found for "{searchValue}"</h1>
            <div className="images-list-container" >
                    <>
                    {searchImages.map((images) =>{
                        return (
                            <div id="single-image" key={images.id}>
                              <NavLink key={images.id} to={`/images/${images.id}`}>
                                  <img
                                  className="AllImages" src={images.imageUrl}
                                ></img>
                              </NavLink>
                                {/* <h2>{image.content}</h2> */}
                            </div>
                          );
                    })}
                    </>
            </div>
        </>
        )
}
export default SearchPage;
