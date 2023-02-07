import React, { useState, useEffect } from 'react';
import OverallRating from './OverallRating.jsx';

export default function ReviewTile(props) {

  // console.log('props', props);

  // const [values, setValues] = useState({
  //  bodyTextLength: 300,
  //  expanded: false
  // });

  const changeDateFormat = () => {
    let timestamp = props.review._id.toString().substring(0, 8);
    let date = new Date( parseInt( timestamp, 16 ) * 1000 );
    let shortDate = new Date(date);
    // let month = ["January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December"];
    //let longDate = month[myDate.getMonth()] + ' ' + (myDate.getDate() + 1).toString() + ', ' + myDate.getFullYear().toString();
    return shortDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  // const show = () => {
  //   if (values.bodyTextLength < props.review.review_text.length) {
  //     setValues((values) => ({
  //       ...values,
  //       bodyTextLength: 3000,
  //       expanded: true
  //     }))
  //   } else if (values.expanded === true) {
  //     setValues((values) => ({
  //       ...values,
  //       bodyTextLength: 300,
  //       expanded: false
  //     }))
  //   }
  // }

  // console.log(props);

  return (
    // <div className='profileReviewBox'>
    <div className= {props.className.includes('driver') || props.className.includes('rider') ? 'allReviews-profileReviewBox' : 'profileReviewBox'}>
      <OverallRating rating={props.review.rating}/>
      {/* <div><strong>{props.review.summary}</strong></div> */}
      <div className='reviewSummary'>{props.review.review_summary ? <div>{props.review.review_summary}</div> : <div>test-header</div>}</div>
      <div className='reviewsProfileReviewerName'>{props.review.full_name}</div>
      <div className='dateOfReview'>{changeDateFormat()}</div>
      <div className= 'reviewProfileReviewText'>
        {props.review.review_text}
      </div>
      {/* <div>
        {values.bodyTextLength >= props.review.review_text.length ? (
          <div></div>
        ) : (
          <p>
            <a className="show_more" onClick={show}>
              {values.expanded ? (
                 <span className='profileReviewText'>less</span>
               ) : (
                 <span className='profileReviewText'>more</span>
               )
              }
            </a>
          </p>
        )}
      </div> */}
    </div>
  )
}

{/* <div className='profileReviewBox'>
<div className='profileReviewerName'>Steve Apple</div>
<div>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
<div className='profileReviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
<div className='profileReviewDate'>1/26/23</div>
</div> */}


{/* <div className="tile">
<FiveStars rating={props.review.rating}/>
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
</div> */}


// return (
//   <div>
//     {props.className.includes('driver') ? (
//       values.riderReviews.map(review =>
//         {
//           return (
//             <ReviewTile className={props.className} review={review} key={review._id} />
//           )
//         }
//       )
//       ) : (
//       values.riderReviews.map(review =>
//         {
//           return (
//             <ReviewTile className={props.className} review={review} key={review._id} />
//           )
//         }
//       )
//     )}
//   </div>
// )