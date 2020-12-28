import { React, useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Vote = ({ voteCounts }) => {
  return <p>has {voteCounts} votes</p>;
};

const App = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [points, setPoints] = useState([1, 4, 6, 3]);
  // 随机展示箴言
  const handleNextShow = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelectedIdx(randomNum);
  };

  // 最高票数箴言
  let maxVoteCount = Math.max(...points);
  // 最高票数箴言的index
  let idxOfMax = points.indexOf(maxVoteCount);
  const handleVoteClick = () => {
    points[selectedIdx] === undefined
      ? (points[selectedIdx] = 1)
      : (points[selectedIdx] += 1);

    setPoints([...points]);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {/* 随机展示箴言和对应投票 */}
      <p>{anecdotes[selectedIdx]}</p>
      <Vote
        voteCounts={points[selectedIdx] === undefined ? 0 : points[selectedIdx]}
      />
      <div>
        <Button
          handleClick={handleVoteClick}
          text={'vote'}
          selectedIdx={selectedIdx}
        />
        <Button handleClick={handleNextShow} text={'next anecdotes'} />
      </div>
      <h1>Anecdote with most votes</h1>

      {/* 最高票数箴言和对应投票*/}
      <p>{anecdotes[idxOfMax]}</p>
      <Vote voteCounts={maxVoteCount} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
