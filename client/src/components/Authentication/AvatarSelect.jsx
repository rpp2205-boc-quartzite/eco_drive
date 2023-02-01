import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const headers = {
  'Authorization': 'Client-ID 1KZjL3_0ZYb1wtaVFXfznj2NwflFvLSfR4pcGFQGsKc'
};

export default function AvatarSelect(props) {

  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    axios.get('https://api.unsplash.com/photos', {headers: headers})
    .then((response) => {
      console.log(response)
      setPhotos(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const onClick = (event) => {
    event.preventDefault();
    props.setState(event.target.id);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <h3>Select a profile picture</h3>
      {photos ? <div>
        {photos.map((photo, index) => (
          <div className='avatar-container' key={index}>
            <img 
              alt='avatar select' 
              src={photo.urls.small}
              id={photo.urls.small}
              onClick={onClick}/>
          </div>))}
      </div> : <p>Loading...</p>}
      <button onClick={props.handleSubmit}>Sign Up</button>    
    </div>
  );
}

