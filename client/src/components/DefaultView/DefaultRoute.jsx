import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DefaultRoute = ({ userId, upcoming }) => {

  if (upcoming.default) {
    return (
      <div>
        _______________________________ <br></br>
        <div>Default Route</div>
        From: {upcoming.start_address} <br />
        To: {upcoming.end_address} <br />
        Time: {upcoming.time} <br />
      </div>
    )
  }
}

export default DefaultRoute;