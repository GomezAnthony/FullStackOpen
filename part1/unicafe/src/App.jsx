/* eslint-disable react/prop-types */
import { useState } from 'react';

const Display = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  );
};

const Button = ({ onClick, label }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

// const Total = ({ label }) => {
//   return (
//     <div>
//       <p>{label}</p>
//     </div>
//   );
// };

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Display />
        <p>No Data Given</p>
        <Button label="Good" onClick={handleGoodClick} />
        <Button label="Neutral" onClick={handleNeutralClick} />
        <Button label="Bad" onClick={handleBadClick} />
      </div>
    );
  }

  return (
    <div>
      {/* Uncomment the Display component if it exists */}
      <Display />
      <Button label="Good" onClick={handleGoodClick} />
      <Button label="Neutral" onClick={handleNeutralClick} />
      <Button label="Bad" onClick={handleBadClick} />
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {good + neutral + bad}</p>
    </div>
  );
};

export default App;
