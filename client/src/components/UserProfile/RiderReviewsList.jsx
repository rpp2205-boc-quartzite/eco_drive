import React from 'react';
import RiderReviewTile from './RiderReviewTile.jsx';

class RiderReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    console.log('asdf', this.props.rider_reviews)
      return (
        <div>
          <div className='profileReviewContainer'>
            <div>
              {this.props.rider_reviews.map((review) =>
                <RiderReviewTile
                key={review._id}
                id={review._id}
                review={review.review_text}
                rating={review.rating}
                />
              )}
            </div>
          </div>
        </div>
      )
  }
}

export default RiderReviewsList;


