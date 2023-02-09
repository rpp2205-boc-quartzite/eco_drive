import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const headers = {
  'Authorization': process.env.UNSPLASH
};

export default function AvatarSelect(props) {

  const [photos, setPhotos] = useState(null);
  const [photos2, setPhotos2] = useState(null);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (photos === null) {
      axios.get('https://api.unsplash.com/photos/random?query=ecology&count=10', {headers: headers})
      .then((response) => {
        setPhotos(response.data.slice(2,5));
        setPhotos2(response.data.slice(6,9));
        setSelected(response.data.slice(2,3)[0].urls.small);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  });

  const getPics = (event) => {
    event.preventDefault();
    axios.get('https://api.unsplash.com/photos/random?query=ecology&count=10', {headers: headers})
    .then((response) => {
      setPhotos(response.data.slice(2,5));
      setPhotos2(response.data.slice(6,9));
      setSelected(response.data.slice(2,3)[0].urls.small);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onClick = (event) => {
    event.preventDefault();
    props.setState(event.target.id);
    setSelected(event.target.id);
  }

  const goBack = (event) => {
    event.preventDefault();
    props.setAvatar(false);
    props.setDriverCheck(true);
  }

  // return (
  //   <div className='avatar-view'>
  //     <div className='avatar-inner-container'>
  //       <h2 className='signup-avatar'>Sign Up</h2>
  //       <h3 className='avatar-sub'>Select a profile picture</h3>
  //       {photos ? <div className='avatar-container'>
  //         <div className='inner-avatar-wrapper'>
  //           {photos.map((photo, index) => (
  //             <div key={index}>
  //               <img
  //                 className={selected === photo.urls.small ? 'selected' : 'avatar-photo'}
  //                 alt='avatar select'
  //                 src={photo.urls.small}
  //                 id={photo.urls.small}
  //                 onClick={onClick}/>
  //             </div>))}
  //         </div>
  //         <div className='inner-avatar-wrapper'>
  //           {photos2.map((photo, index) => (
  //             <div key={index}>
  //               <img
  //                 className={props.state === photo.urls.small ? 'selected' : 'avatar-photo'}
  //                 alt='avatar select'
  //                 src={photo.urls.small}
  //                 id={photo.urls.small}
  //                 onClick={onClick}/>
  //             </div>))}
  //         </div>
  //       </div> : <p className='avatar-container'>Loading...</p>}
  //     </div>
  //     <div className='signup-btn-wrapper'>
  //       <button className='signup-btn' onClick={props.handleSubmit}><span className='sign-up-text'>Sign Up</span></button>
  //       <button className='back-btn' onClick={goBack}><span className='back-text'>Go Back</span></button>
  //     </div>
  //   </div>
  // );

  if (photos) {
    return (
      <div className='avatar-view'>
        <div className='avatar-inner-container'>
          <h2 className='signup-avatar'>Sign Up</h2>
          <h3 className='avatar-sub'>Select a profile picture</h3>
          <div className='avatar-container'>
            <div className='inner-avatar-wrapper'>
              {photos.map((photo, index) => (
                <div key={index}>
                  <img
                    className={selected === photo.urls.small ? 'selected' : 'avatar-photo'}
                    alt='avatar select'
                    src={photo.urls.small}
                    id={photo.urls.small}
                    onClick={onClick}/>
                </div>))}
            </div>
            <div className='inner-avatar-wrapper'>
              {photos2.map((photo, index) => (
                <div key={index}>
                  <img
                    className={selected === photo.urls.small ? 'selected' : 'avatar-photo'}
                    alt='avatar select'
                    src={photo.urls.small}
                    id={photo.urls.small}
                    onClick={onClick}/>
                </div>))}
            </div>
          </div>
          <button className='secondary-btn' onClick={getPics}>Refresh Photos</button>
        </div>
        <div className='link-frame'>
          <button className='primary-btn' onClick={props.handleSubmit}>Sign Up</button>
          <button className='back-btn' onClick={goBack}><span className='back-text'>Go Back</span></button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='loading-screen'>
        <h2 className='signup-avatar'>Sign Up</h2>
        <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
        <p>Loading photos...</p>
      </div>
    )
  }
}

// if (photos) {
//   return (
//     <div className='avatar-view'>
//       <div className='avatar-inner-container'>
//         <h2 className='signup-avatar'>Sign Up</h2>
//         <h3 className='avatar-sub'>Select a profile picture</h3>
//         <div className='avatar-container'>
//           <div className='inner-avatar-wrapper'>
//             {photos.map((photo, index) => (
//               <div key={index}>
//                 <img
//                   className={selected === photo.urls.small ? 'selected' : 'avatar-photo'}
//                   alt='avatar select'
//                   src={photo.urls.small}
//                   id={photo.urls.small}
//                   onClick={onClick}/>
//               </div>))}
//           </div>
//           <div className='inner-avatar-wrapper'>
//             {photos2.map((photo, index) => (
//               <div key={index}>
//                 <img
//                   className={props.state === photo.urls.small ? 'selected' : 'avatar-photo'}
//                   alt='avatar select'
//                   src={photo.urls.small}
//                   id={photo.urls.small}
//                   onClick={onClick}/>
//               </div>))}
//           </div>
//         </div>
//       </div>
//       <div className='link-frame'>
//         <button className='primary-btn' onClick={props.handleSubmit}>Sign Up</button>
//         <button className='back-btn' onClick={goBack}><span className='back-text'>Go Back</span></button>
//       </div>
//     </div>
//   )
// } else {
//   return (
//     <div className='loading-screen'>
//       <h2 className='signup-avatar'>Sign Up</h2>
//       <img className='loading-gif' src="https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif" alt="Loading" />
//       <p>Loading photos...</p>
//     </div>
//   )
// }