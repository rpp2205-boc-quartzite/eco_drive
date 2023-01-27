/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal.jsx';

export default function Reviews(props) {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  let id = '63d36f099d38b4ed1dba8f3a';

  useEffect(() => {
    var id = '63d36f099d38b4ed1dba8f3a';
    axios.get('/ratings_reviews', { params: {id} })
    .then((result) => {
      console.log('got da driver', result)
      setName(result.data[0].full_name);
    })
    .catch(err => console.log(err))
    //document.title = `You clicked ${count} times`;
  }, []);

  if (name.length > 0) {
    return (
      <div>
        <p>{name}</p>
        <button onClick={() => setShowModal(true)}>Write Your Review</button>
        <ReviewModal show={showModal} userid={id} close={() => setShowModal(false)} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}