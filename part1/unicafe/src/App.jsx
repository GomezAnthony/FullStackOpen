import { useState } from 'react';

const Display = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display />
    </div>
  );
};

export default App;
