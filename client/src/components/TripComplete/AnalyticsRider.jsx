import React from 'react';

const AnalyticsRider = (props) => {

  console.log('distance', props.distance)

  const mpg = 20;
  const gasPricePerGallon = 4.50

  let savings = (parseInt(props.distance) / mpg * gasPricePerGallon).toFixed(2);

  console.log(savings);

  return (
    <div>
      {/* <p className="riders">Your Savings:</p> */}
      <p className="riders"></p>
    </div>
  )
}

export default AnalyticsRider;