import { useHistory } from "react-router-dom";
import "./Banner.css";
import { useState } from "react";

function Banner() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleForm = async (e) => {
    e.preventDefault();

    if (search.length > 0) {
      history.push(`/search/${search}`);
    } else {
      history.push(`/`);
    }
  };
  return (
    <>
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-logo-container">
          {/* Search Bar Container don't delete this div*/}
        </div>
        <div className="banner-form-container">
            <label className="label-banner" htmlFor="search">
              <input
                type="text"
                className="banner-search-input"
                autoComplete="off"
                id="search"
                placeholder="Search"
                maxLength="50"
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </label>
            <button className="banner-submit" onClick={handleForm}>
            </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Banner;
