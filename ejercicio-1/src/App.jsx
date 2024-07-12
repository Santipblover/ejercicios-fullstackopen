import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const averageValue = all ? average / all : 0;

  const positiveAverage = all ? (positive / all) * 100 : 0;

  const goodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1);
    setPositive(positive + 1);
  };

  const neutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage(average + 0);
  };

  const badClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage(average - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text="Good" />{" "}
      <Button handleClick={neutralClick} text="Neutral" />{" "}
      <Button handleClick={badClick} text="Bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        positive={positive}
        average={average}
        averageValue={averageValue}
        positiveAverage={positiveAverage}
      ></Statistics>
    </div>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      {props.all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={props.averageValue} />
            <StatisticLine text="positive %" value={props.positiveAverage} />
          </tbody>
        </table>
      )}
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

export default App;
