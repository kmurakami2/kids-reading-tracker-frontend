import React, { useState } from 'react';

function ReadingTimer() {
  const [time, setTime] = useState(0);

  return (
    <div className="reading-timer">
      <h3>Reading Timer</h3>
      <p>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
      <button>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  );
}

export default ReadingTimer;