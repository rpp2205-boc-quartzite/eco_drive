import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from './StarRating.jsx';
import axios from 'axios';

const ReviewModal = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    nickname: '',
    rating: 0,
    email: '',
    text: '',
    characterCount: 50
  });

const handleTextInputChange = (event) => {
  event.persist();
  let length = 50 - event.target.value.length;
  setValues((values) => ({
    ...values,
    text: event.target.value,
    characterCount: length
  }));
};

// const handleNicknameInputChange = (event) => {
//   event.persist();
//   setValues((values) => ({
//     ...values,
//     nickname: event.target.value,
//   }));
// };

// const handleEmailnputChange = (event) => {
//   event.persist();
//   setValues((values) => ({
//     ...values,
//     email: event.target.value,
//   }));
// };

const handleClick = (rating) => {
  setValues((values) => ({
    ...values,
    rating: rating,
  }));
 };

 const closeModal = () => {
  props.close();
 }

 const handleSubmit = (event) => {
    event.preventDefault();
    let review = {
      userid: props.userid,
      rating: values.rating,
      review_text: values.text
    };

    console.log('ReviewModal handleSubmit review', review);

    axios.post('/ratings_reviews', review)
    .then((response) => {
      console.log(response);
      closeModal();
      setSubmitted(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  console.log("PROPS in MODAL", props);
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        onHide={props.close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Write Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <form id="review-form">
              <label className="rf-label">
                <h4 className="rf-header">Overall Rating</h4>
                <StarRating click={handleClick}/>
              </label>
              <label className="rf-label">
                <h4 className="rf-header">Add a written review</h4>
                <textarea value={values.text} className="form-field" required minLength="50" maxLength="1000" placeholder="How was your experience?"  onChange={handleTextInputChange}/>
                {values.characterCount > 0 ? <div>Minimum required characters left: [{values.characterCount}]</div> :<div>Minimum reached</div>}
              </label>
              <button className="form-field" type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
            {submitted && <div class='success-message'>Success! Thank you for your review!</div>}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>

        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ReviewModal;

{/* <div className="form-container">
<form id="review-form">
  <label className="rf-label">
    <h4 className="rf-header">Overall Rating</h4>
    <StarRating click={handleClick}/>
  </label>
  <label className="rf-label">
    <h4 className="rf-header">Add a written review</h4>
    <textarea value={values.text} className="form-field" required minLength="50" maxLength="1000" placeholder="How was your experience?"  onChange={handleTextInputChange}/>
    {values.characterCount > 0 ? <div>Minimum required characters left: [{values.characterCount}]</div> :<div>Minimum reached</div>}
  </label>
  <label className="rf-label">
    <h4 className="rf-header">Choose your nickname</h4>
    <input type="text" value={values.nickname} className="form-field" required maxLength="60" placeholder="Example: jackson11!" onChange={handleNicknameInputChange}/>
    <div>For privacy reasons, do not use your full name</div>
  </label>
  <label className="rf-label">
    <h4 className="rf-header">Email</h4>
    <input type="email" value={values.email} className="form-field" required maxLength="60" placeholder="Example: jackson11@email.com" onChange={handleEmailnputChange}/>
    <div>For authentication reasons, you will not be emailed</div>
  </label>
  {/* <input className="form-field" type="submit" value="Submit"/> */}
//   <button className="form-field" type="submit" onSubmit={handleSubmit}>Submit</button>
// </form>
// {submitted && <div class='success-message'>Success! Thank you for your review!</div>}
// </div> */}