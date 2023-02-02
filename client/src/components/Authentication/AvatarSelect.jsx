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
      setPhotos(response.data.slice(2,5));
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
    <div className='avatar-view'>
      <div className='avatar-inner-container'>
        <h2 className='signup-avatar'>Sign Up</h2>
        <h3 className='avatar-sub'>Select a profile picture</h3>
        {photos ? <div className='avatar-container'>
          <div className='inner-avatar-wrapper'>
            {photos.map((photo, index) => (
              <div key={index}>
                <img 
                  className='avatar-photo'
                  alt='avatar select' 
                  src={photo.urls.small}
                  id={photo.urls.small}
                  onClick={onClick}/>
              </div>))}
          </div>
        </div> : <p>Loading...</p>}
      </div>
      <div className='signup-btn-wrapper'>
        <button className='signup-btn' onClick={props.handleSubmit}>Sign Up</button>    
      </div>
    </div>
  );
}

