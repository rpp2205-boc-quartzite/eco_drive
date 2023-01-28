import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const StarRating = ({click}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              className="rating"
              value={ratingValue}
              onClick={
                (e) => {
                  setRating(ratingValue);
                  click(ratingValue);
                }
              }
            />
            <FaStar
              className="star"
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating;