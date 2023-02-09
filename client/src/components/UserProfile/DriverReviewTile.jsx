import React from 'react';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';
class DriverReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: ''
    }
  }

  componentDidMount () {
    var id = this.props.id;
    // var id = '63e2f59e9afa2a254a9389d9'
    console.log('IDDDD', typeof id)
    axios.get('/getUserInfo', { params: {id} })
    // console.log('chelsea hi!')
    .then((result) => {
      console.log('IS THIS OWRKING?ID!!!', result)
      this.setState({
        full_name: result.data[0].full_name
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('tile testing', this.props.id)
      return (
        <div className='profileReviewBox'>
          {/* <div className='profileReviewerName'>{this.state.full_name}</div>
          ***** hardcoding this due to lack of good data in DB for now */}
          {this.state.full_name ?
            <div className='profileReviewerName'>{this.state.full_name}</div> :
            <div className='profileReviewerName'>Amy Johnson</div>
          }

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
          <div className='profileReviewDate'>2/3/23</div>
        </div>

      )

  }
}

export default DriverReviewTile;


