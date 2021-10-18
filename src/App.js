import React, { useRef, useState } from 'react'
import axios from 'axios';

import './App.css';
import ModalPopUp from './ModalPopUp';

const App = () => {

  let textInput = useRef();
  const [data, setData] = useState([])
  const [tag, setTag] = useState("")
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();


  const photoUrl = "https://live.staticflickr.com/";

  const targetValue = (e) => {
    getData(textInput.current.value);
    e.preventDefault();
    setTag(e.target.value);
  }

  function getData(text) {
    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bb53869236e2a3cb878532175c49a19c&nojsoncallback=true&format=json&tags=${text}`;
    axios.get(url)
      .then(res =>
        // console.log(res.data.photos.photo)
        setData(res.data.photos.photo)
      )
  }

  const handleShowDialog = (e) => {
    setImageSrc(e.target.src);
  }


  return (
    <div className="container">
      <br />
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card-body row no-gutters align-items-center">
            <div className="col-auto">
              <i className="fas fa-search h4 text-body"></i>
            </div>
            <div className="col">
              <input ref={textInput} className="form-control form-control-lg form-control-borderless" type="text" placeholder="Search topics or keywords" />
            </div>
            <div className="col-auto">
              <button onClick={targetValue} className="btn btn-lg" type="submit">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="list-container">
        {
          data.map(list => (
            <div className="list-images" >
              <img onClick={handleShowDialog} className="list-img" src={`${photoUrl}${list.server}/${list.id}_${list.secret}.jpg`} alt={list.name} />
            </div>
          )
          )
        }
        {
          open && < ModalPopUp open={open} setOpen={setOpen} url={imageSrc} />}

      </div>
    </div >
  );
}

export default App;
