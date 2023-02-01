import React from 'react';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';

class RiderReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: ''
    }
  }

  // componentDidMount () {
  //   var id = this.props.id;
  //   //console.log('IDDDD', id)
  //   axios.get('/getRiderView', { params: {id} })
  //   .then((result) => {
  //     //console.log('ID!!!', result)
  //     this.setState({
  //       full_name: result.data[0].full_name
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }

  render() {
      return (
        <div className='profileReviewBox'>
          {/* <div className='profileReviewerName'>{this.state.full_name}</div>
          ***** hardcoding this due to lack of good data in DB for now */}
          <div className='profileReviewerName'>Amy Johnson</div>
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


