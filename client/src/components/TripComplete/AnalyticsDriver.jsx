import React from 'react';

const AnalyticsDriver = (props) => {

  console.log('distance', props.distance)

  const mpg = 20;
  const gasPricePerGallon = 4.50

  let savings = (parseInt(props.distance) / mpg * gasPricePerGallon).toFixed(2);

  console.log(savings);

  return (
    <div>
      <p className="riders">Your Savings:</p>
      <p className="riders">${savings}</p>
    </div>
  )
}

export default AnalyticsDriver;