import React from 'react';
import RiderReviewTile from './RiderReviewTile.jsx';
import axios from 'axios';

class RiderReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    //console.log('asdf', this.props.rider_reviews)
    // console.log('HEYGEYRERH', this.props.userId)
      return (
        <div>
          <div className='profileReviewContainer'>
            <div>
              {this.props.rider_reviews.map((review) =>
                <RiderReviewTile
                key={review._id}
                review={review.review_text}
                full_name={review.full_name}
                rating={review.rating}
                userId={this.props.userId}
                />
              )}
            </div>
          </div>
        </div>
      )
  }
}

export default RiderReviewsList;


