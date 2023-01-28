import React, { useState, useEffect } from 'react';
import FiveStars from './FiveStars.jsx';

export default function ReviewTile(props) {

  console.log('props', props);

  const [values, setValues] = useState({
   bodyTextLength: 250,
   expanded: false
  });

  // const changeDateFormat = (date) => {
  //   var myDate = new Date(date);
  //   var month = ["January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"];
  //   return month[myDate.getMonth()] + ' ' + (myDate.getDate() + 1).toString() + ', ' + myDate.getFullYear().toString();
  // }

  const show = () => {
    if (values.bodyTextLength < props.review.review_text.length) {
      setValues((values) => ({
        ...values,
        bodyTextLength: props.review.review_text.length,
        expanded: true
      }))
    } else if (values.bodyTextLength === props.review.review_text.length) {
      setValues((values) => ({
        ...values,
        bodyTextLength: 250,
        expanded: false
      }))
    }
  }

  return (
    <div className="tile">
      <FiveStars rating={props.review.rating}/>
      {/* <div><strong>{this.props.review.summary}</strong></div> */}
      {/* <div className="tile-user">{this.props.review.reviewer_name}</div> */}
      <div>{props.review.review_text.slice(0, values.bodyTextLength)}</div>
      <div>
        {values.bodyTextLength > props.review.review_text.length ? (
          <div></div>
        ) : (
          <p>
            <a className="show_more" onClick={show}>
              {values.expanded ? (
                 <span>Show less</span>
               ) : (
                 <span>Show more</span>
               )
              }
            </a>
          </p>
        )}
      </div>
      <div><hr /></div>
    </div>
  )
}