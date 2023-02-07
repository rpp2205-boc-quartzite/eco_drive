import React from 'react';

class RiderRecentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    }
  }

  componentDidMount () {
    var id = this.props.id;
    console.log('IDDDD', id)
    axios.get('/getUserInfo', { params: {id} })
    .then((result) => {
      console.log('ID!!!', result)
      this.setState({
        avatar: result.data[0].avatar
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    console.log('this.props.id', this.props.id)
    return (
      <div>
        {this.props.id}
          {/* <div className='profileReviewerName'>{this.state.full_name}</div> */}
          {/* <div className='profileReviewText'>{this.props.review.slice(0, 200)}</div>
          <div className='profileReviewDate'>1/26/23</div> */}

          {/* <Link to="/ratings-reviews">
          {!this.state.avatar ?
          <img className='profileRecentDriver' src="https://drive.google.com/uc?export=view&id=1lJDY3CixLoKNFD1CkLhqcySmOPg5k02Y" alt="drive image"/> :
          <img className='profileRecentDriver' src={this.state.avatar} alt="profile avatar"/>
        }</Link> */}

        </div>

      )

  }
}

export default RiderRecentCard;