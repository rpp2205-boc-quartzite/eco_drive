import React from 'react';

class DriverReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    console.log('this.props.name', this.props.name)
      return (
        <div>
              <div className='profileReviewBox'>
                <div className='profileReviewerName'>{this.props.name.slice(0, 20)}</div>
                <div>&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <div className='profileReviewText'>{this.props.review.slice(0, 190)}</div>
                <div className='profileReviewDate'>1/26/23</div>
            </div>
        </div>
      )

  }
}

export default DriverReviewTile;


