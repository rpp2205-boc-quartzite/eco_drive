import React from 'react';
import Ratings from 'react-ratings-declarative';

class RiderReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div className='profileReviewBox'>

          {/* <div className='profileReviewerName'>{this.state.full_name}</div>
          ***** hardcoding this due to lack of good data in DB for now */}
          <div className='profileReviewerName'>Amy Johnson</div>
          <div>HU!</div>
          {/* <div className='profileReviewerName'>{this.state.full_name}</div> */}
          <div>
            <Ratings
              rating={this.props.rating}
              widgetRatedColors="#FFB629"
              widgetDimensions="15px"
              widgetSpacings="1px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
          </div>
          <div className='profileReviewText'>{this.props.review.slice(0, 200)}</div>
          <div className='profileReviewDate'>1/26/23</div>
        </div>

      )

  }
}

export default RiderReviewTile;