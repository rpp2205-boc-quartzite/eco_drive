import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from './StarRating.jsx';
import axios from 'axios';

const ReviewModal = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [reported, setReported] = useState(false);
  const [values, setValues] = useState({
    full_name: props.userData.full_name,
    rating: 1,
    text: '',
    summary: '',
    characterCount: 25
  });

  useEffect(() => {
    setValues((values) => ({
      ...values,
      full_name: props.userData.full_name,
      rating: 1,
      text: '',
      summary: '',
      characterCount: 25
    }));
  }, [props.show]);

  const handleTextInputChange = (event) => {
    event.persist();
    let length = 25 - event.target.value.length;
    // if (values.characterCount < 0) {
    //   console.log('testing characterCount', values.characterCount);
    // }
    setValues((values) => ({
      ...values,
      text: event.target.value,
      characterCount: length
    }));
  };

  const handleSummaryInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      summary: event.target.value
    }));
  };

  const handleClick = (rating) => {
    setValues((values) => ({
      ...values,
      rating: rating,
    }));
  };

  const closeModal = () => {
    props.close();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isReportModalOpen) {
      let report = {
        report_text: values.text,
        full_name: props.userData.full_name
      };

      console.log('ReviewModal handleSubmit report');

      axios.post(`/reviews/${props.revieweeData._id}/report`, report)
      .then((response) => {
        setReported(true);
        props.reportUser(true);
        setTimeout(
          () => closeModal(),
          2000
        )
      })
      .catch((error) => {
        console.error(error);
      });

    } else {
      let review = {
        revieweeId: props.revieweeData._id,
        full_name: props.userData.full_name,
        rating: values.rating,
        review_text: values.text,
        review_summary: values.summary,
        view: props.view
      };
      console.log('full_name: ', props.userData.full_name);
      console.log('ReviewModal handleSubmit review', review);

      axios.post('/newreview', review)
      .then((response) => {
        console.log('driver_reviews - post - response', response);
        console.log('test date', response.data);
        setSubmitted(true);
        props.submit();
        setTimeout(
          () => closeModal(),
          2000
        )
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

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
          {props.isReportModalOpen ? (
            <Modal.Title id="report-modal">
              <div>Are You Sure You Want to Report this Driver?</div>
            </Modal.Title>
            ) : (
            <Modal.Title id="review-modal">
              <div>Write Your Review</div>
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <form id="review-form" onSubmit={handleSubmit}>
              <label className="rf-label">
                {props.isReportModalOpen ? (
                  <div></div>
                ) : (
                  <div>
                    <h3 className="rf-header">Overall Rating</h3>
                    <div id="star-ranks">
                        <StarRating click={handleClick}/>
                    </div>
                  </div>
                )}
              </label>
              <label className="rf-label">
                {props.isReportModalOpen ? (
                  <div>
                    <h4 className="rf-header">Write your comment</h4>
                    <textarea value={values.text} className="form-field" required minLength="25" maxLength="180" placeholder=""  onChange={handleTextInputChange}/>
                  </div>
                ) : (
                  <div>
                    <h4 className="rf-header">Add a written review</h4>
                    <h5 className="rf-header">Add a headline</h5>
                    <input type="text" value={values.summary} className="review-summary" required maxLength="30" placeholder="" onChange={handleSummaryInputChange}/>
                    <textarea value={values.text} className="form-field" required minLength="25" maxLength="180" placeholder="How was your experience?"  onChange={handleTextInputChange}/>
                  </div>
                )}
                {values.characterCount > 0 ? <div>Minimum required characters left: [{values.characterCount}]</div> :<div>Minimum reached</div>}
              </label>
                {props.isReportModalOpen ? (
                  // <button className="form-field-report" type="submit" onClick={handleSubmit}>Report</button>
                  <input className="form-field-report" disabled={values.characterCount > 0} type="submit" value="Report"/>
                ) : (
                  // <button className="form-field-submit" disabled={values.characterCount > 0} type="submit" onClick={handleSubmit}>Submit</button>
                  <input className="form-field-submit" disabled={values.characterCount > 0} type="submit" value="Submit"/>
                )}
            </form>
              {props.isReportModalOpen ? (
                <div>
                  {reported && <div className='success-message'>Thank you. Your report has been submitted.</div>}
                </div>
              ) : (
                <div>
                  {submitted && <div className='success-message'>Success! Thank you for your review!</div>}
                </div>
              )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewModal;

// {values.bodyTextLength >= props.review.review_text.length ? (
//   <div></div>
// ) : (
//   <p>
//     <a className="show_more" onClick={show}>
//       {values.expanded ? (
//          <span className='profileReviewText'>less</span>
//        ) : (
//          <span className='profileReviewText'>more</span>
//        )
//       }
//     </a>
//   </p>
// )}



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

{/* <label className="review_form_label">
<h4 className="rf_header">Add a headline</h4>
<input type="text" value={this.state.reviewSummary} className="review_summary" required maxLength="60" placeholder="Example: Best purchase ever!" onChange={this.handleChange}/>
</label> */}