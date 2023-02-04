import React from 'react';
import OverallRating from './OverallRating.jsx';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {
        '5': [],
        '4': [],
        '3': [],
        '2': [],
        '1': []
      },
      // fiveStarReviews: '',
      // fourStarReviews: '',
      // threeStarReviews: '',
      // twoStarReviews: '',
      // oneStarReviews: '',
      isToggled: this.props.isToggled,
      filterNotifications: [],
      filteredReviews: [],
    };

    this.percentageOfAllReviews = this.percentageOfAllReviews.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.allRatings.length > prevProps.allRatings.length) {
      this.percentageOfAllReviews();
    }
  }

  percentageOfAllReviews() {
    let ratings = {
      '5': [],
      '4': [],
      '3': [],
      '2': [],
      '1': [],
      '0': []
    };

    console.log('ratings:', ratings);
    console.log('allRatings: ', this.props.allRatings);

    this.props.allRatings.forEach(rating => {
      console.log('rating', rating);
      ratings[rating].push(rating);
    })

    for (var key in ratings) {
      let allSpecificRatings = ratings[key].length;
      console.log('allSpecificRatings', allSpecificRatings);
      let percentageOfTotalSpecificRatings = `${parseFloat(allSpecificRatings/this.props.allRatings.length).toFixed(2)*100}%`
      ratings[key] = percentageOfTotalSpecificRatings;
    }

    // this.setState({
    //   fiveStarReviews: ratings[5],
    //   fourStarReviews: ratings[4],
    //   threeStarReviews: ratings[3],
    //   twoStarReviews: ratings[2],
    //   oneStarReviews: ratings[1]
    // }, () => {console.log('state:', this.state)})

    this.setState({
      reviews: {
        ...this.state.reviews,
        '5': ratings[5],
        '4': ratings[4],
        '3': ratings[3],
        '2': ratings[2],
        '1': ratings[1]
      }
    }, () => {console.log('state:', this.state)})
  }

  filterReviews(event) {
    event.persist();
    let value = parseInt(event.target.innerText[0]);
    console.log('value: ', value);
    let reviews = this.props.allReviews;
    console.log('reviews testing: ', reviews);
    console.log('this.props.isToggled', this.props.isToggled);

    let results = reviews.filter(review => {
      return review.rating === value;
    });

    console.log('results: ', results);
    console.log('is toggled: ', this.state.isToggled);
    console.log('filtered reviews: ', this.state.filteredReviews)

    if (this.state.isToggled[value - 1] === 1) {
      results = this.state.filteredReviews.filter(result => {
        return result.rating !== value;
      });
      let filterNotifications = [];
      let isToggled = this.state.isToggled;
      isToggled[value - 1] = 0;
      for (var i = isToggled.length - 1; i > -1; i--) {
        if (isToggled[i] === 1) {
          filterNotifications.push(`${i + 1} stars`);
        }
      }
      this.setState({
        isToggled: isToggled,
        filteredReviews: results,
        filterNotifications: filterNotifications
      }, () => {this.props.changeToggles([...this.state.isToggled]);});

    } else if (this.state.filteredReviews.length > 0 ) {
      results = this.state.filteredReviews.concat(results);
      console.log('results 2345', results);
      let filterNotifications = [];
      let isToggled = this.state.isToggled;
      isToggled[value - 1] = 1;
      console.log('isToggled 2345', isToggled);
      console.log('isToggled 6789', [...this.state.isToggled]);
      console.log('isToggled 4567', ...this.state.isToggled);
      for (var i = isToggled.length - 1; i > -1; i--) {
        if (isToggled[i] === 1) {
          filterNotifications.push(`${i + 1} stars`);
        }
      }
      this.setState({
        isToggled: isToggled,
        filteredReviews: results,
        filterNotifications: filterNotifications
      }, () => {this.props.changeToggles([...this.state.isToggled])});
    } else {
      let filterNotifications = [];
      let isToggled = this.state.isToggled;
      isToggled[value - 1] = 1;
      console.log('testing 12345 12345');
      for (var i = isToggled.length - 1; i > -1; i--) {
        if (isToggled[i] === 1) {
          filterNotifications.push(`${i + 1} stars`);
        }
      }
      this.setState({
        isToggled: isToggled,
        filteredReviews: results,
        filterNotifications: filterNotifications
      }, () => {console.log('this is a test123456', this.state.isToggled); this.props.changeToggles([...this.state.isToggled]);});
    }
  }

  clearFilter() {
    this.setState({
      filteredReviews: [],
      isToggled: [0,0,0,0,0],
      filterNotifications: [],
    }, () => {console.log('this is a test12345678', this.state.isToggled); this.props.changeToggles([...this.state.isToggled]);});
  }

  render() {
    return (
      <div className="ratings_breakdown">
        {/* {this.props.className.includes('driver') ? (
          <strong>Ratings and Reviews from Drivers</strong>
          ) : (
          <strong>Ratings and Reviews from Riders</strong>
        )} */}
        <div className="star_rating">
          <div className="star_rating_text">{this.props.overallRating.toFixed(2)}</div>
          <div className="star_output"><OverallRating rating={this.props.overallRating}/></div>
        </div>
        {/* {this.props.className.includes('driver') ? (
          <strong className="all-reviews-total">Total number of reviews from other Drivers: {this.props.allRatings.length}</strong>
          ) : (
          <strong className="all-reviews-total">Total number of reviews from other Riders: {this.props.allRatings.length}</strong>
        )} */}
        {/* <div>Total Ratings: {this.props.allRatings.length}</div> */}
        <div className="filter_ratings_message">
          {this.state.filterNotifications.length > 0 ? (<div>Filtered By: </div>) : (null)}
          {this.state.filterNotifications.map((notification, index) => {return <div key={index}>{notification}</div>})}
        </div>
        {this.state.filterNotifications.length > 0 ? (<div><button onClick={() => {this.clearFilter();}}>Clear Filter</button></div>) : (null)}
        <div className="progress_bars">
          {[...Array(5)].map((element, index) =>
            <div key={index}>
              {
                this.state.reviews[index + 1] === '0%'
                ?  <div>
                     <a className="ratings_bar disabledCursor" style={{float:'left'}} onClick={ (event) => event.preventDefault() }>{index + 1} Stars</a>
                     <div className="progress">
                       <div className="bar" style={{width:`${this.state.reviews[index + 1]}`}}></div>
                     </div>
                   </div>
                :  <div>
                     <a className="ratings_bar" style={{float:'left'}} onClick={(e) => {this.filterReviews(e)}}>{index + 1} Stars</a>
                       <div className="progress">
                         <div className="bar" style={{width:`${this.state.reviews[index + 1]}`}}></div>
                      </div>
                   </div>
              }
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default RatingsBreakdown;

// constructor(props) {
//   super(props);
//   this.state = {
//     filteredReviews: [],
//     isToggled: [0,0,0,0,0],
//     ratings: this.props.reviewsMeta.ratings
//   };

//   this.clearFilter = this.clearFilter.bind(this);
//   this.filterReviews = this.filterReviews.bind(this);
//   this.search = this.search.bind(this);
// }

// search(reviews) {
//   this.setState({filteredReviews: reviews}, () => { console.log('testing search under Ratings_Reviews'); });
//  }

// componentDidUpdate(prevProps) {
//   if (this.props.productId !== prevProps.productId) {
//     this.setState({
//       filteredReviews: [],
//       isToggled: [0,0,0,0,0],
//       ratings: this.props.reviewsMeta.ratings
//     })
//   }
// }

// clearFilter() {
//   this.setState({
//     filteredReviews: [],
//     isToggled: [0,0,0,0,0]
//   })
// }

// filterReviews(e) {
//   const value = parseInt(e.target.innerText[0]);
//   const reviews = this.props.reviews;
//   let results = reviews.filter(result => {
//     if (result.rating === value) {
//       return result;
//     }
//   });

//   if (this.state.isToggled[value - 1] === 1) {
//     results = this.state.filteredReviews.filter(result => {
//       if (result.rating !== value) {
//         return result;
//       }
//     });
//     this.state.isToggled[value - 1] = 0;
//     this.setState({
//       filteredReviews: results
//     }, () => {console.log(this.state.filteredReviews)});
//   } else if (this.state.filteredReviews.length > 0 ) {
//     results = this.state.filteredReviews.concat(results);
//     this.state.isToggled[value - 1] = 1;
//     this.setState({
//       filteredReviews: results
//     }, () => {console.log(this.state.filteredReviews)});
//   } else {
//     this.state.isToggled[value - 1] = 1;
//     this.setState({
//       filteredReviews: results
//     }, () => {console.log(this.state.filteredReviews)});
//   }
// }

// filterNotification(event) {
  //   event.persist();
  //   let value = parseInt(event.target.innerText[0]);
  //   console.log('filterNotification - value: ', value);
  //   let filterNotifications = [];
  //   let isToggled = this.state.isToggled;

  //   if (isToggled[value - 1] === 1) {
  //     isToggled[value - 1] = 0;
  //   } else {
  //     isToggled[value - 1] = 1;
  //   }

  //   // if (this.state.isToggled[value - 1] === 1) {
  //   //   this.state.isToggled[value - 1] = 0;
  //   // } else {
  //   //   this.state.isToggled[value - 1] = 1;
  //   // }

  //   for (var i = isToggled.length - 1; i > -1; i--) {
  //     if (isToggled[i] === 1) {
  //       filterNotifications.push(`${i + 1} stars`);
  //     }
  // }

  //   // for (var i = this.state.isToggled.length-1; i > -1; i--) {
  //   //     if (this.state.isToggled[i] === 1) {
  //   //       filterNotifications.push(`${i + 1} stars`);
  //   //     }
  //   // }

  //   this.setState({
  //     isToggled: isToggled,
  //     filterNotifications: filterNotifications
  //   }, () => {console.log(this.state.filterNotifications)})
  // }

  // clearfilterNotifications() {
  //   this.setState({
  //     isToggled: [0,0,0,0,0],
  //     filterNotifications: []
  //   })
  // }