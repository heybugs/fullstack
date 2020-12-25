import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ data }) => {
  return <button onClick={data.handle}>{data.text}</button>;
};

const Statistics = ({ data }) => {
  return (
    <p>
      {data.text} <span>{data.count}</span>
    </p>
  );
};

const App = () => {
  // save clicks of each button to own state
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

  const all = good + neutral + bad;
  let dataArr = [
    { text: 'good', count: good, handle: handleGoodClick },
    { text: 'neutral', count: neutral, handle: handleNeutralClick },
    { text: 'bad', count: bad, handle: handleBadClick },
    { text: 'all', count: all },
    { text: 'average', count: ((good - bad) / all).toFixed(1) },
    { text: 'positive', count: ((good * 100) / all).toFixed(1) + '%' },
  ];
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button data={dataArr[0]} />
        <Button data={dataArr[1]} />
        <Button data={dataArr[2]} />
      </div>
      <h1>statistics</h1>
      {dataArr[0].count !== 0 ||
      dataArr[1].count !== 0 ||
      dataArr[1].count !== 0 ? (
        <div>
          <Statistics data={dataArr[0]} />
          <Statistics data={dataArr[1]} />
          <Statistics data={dataArr[2]} />
          <Statistics data={dataArr[3]} />
          <Statistics data={dataArr[4]} />
          <Statistics data={dataArr[5]} />
        </div>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
