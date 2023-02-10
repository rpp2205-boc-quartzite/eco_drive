import React from 'react';
import Ratings from 'react-ratings-declarative';
import axios from 'axios';

class RiderReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    //console.log('BRANDON PROPS', this.props)
    return (
      <div className='profileReviewBox'>

            <div className='profileReviewerName'>{this.props.full_name}</div>
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