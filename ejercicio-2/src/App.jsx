import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleChange = () => {
    const indiceAleatorio = Math.floor(Math.random() * anecdotes.length);
    setSelected([indiceAleatorio]);
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVotes = () => {
    console.log(...votes);
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const anecdoteMostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} <br />
        Has {votes[selected]} votes
      </p>

      <button onClick={handleVotes}>Vote</button>
      <ChangeAnecdote
        text="Next anecdote"
        handleAnecdoteChange={handleChange}
      />
      <h1>Anecdotes with most votes</h1>
      <p>
        {anecdotes[anecdoteMostVotes]} <br />
        has {votes[anecdoteMostVotes]} votes
      </p>
    </div>
  );
};

const ChangeAnecdote = (props) => {
  console.log("ChangeAndecdote props", props);
  return (
    <div>
      <button onClick={props.handleAnecdoteChange}>{props.text}</button>
    </div>
  );
};

export default App;
