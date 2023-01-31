import React, { useState } from 'react';

export default function DefaultRoute ({ default_route }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [time, setTime] = useState('');

  return (
    <div>
      From: {default_route.start_address} <br />
      To: {default_route.end_address} <br />
      Time: {default_route.time} <br />
    </div>
  )
}