import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>{props.text}</button>
)

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td> 
        </tr>
    )
}


const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    if (all === 0) {
        return (
            <>
            No feedback given
            </>
        )
    }
    const average = ((good - bad)/all).toFixed(2)
    const positive = (good / all * 100).toFixed(2) + '%'
  
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value ={good} />
                <StatisticLine text="neutral" value ={neutral} />
                <StatisticLine text="bad" value ={bad} />
                <StatisticLine text="all" value ={all} />
                <StatisticLine text="average" value ={average} />
                <StatisticLine text="positive" value ={positive}/>
            </tbody>
        </table>

    )
  }



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGoodClick() {
    setGood(good + 1);
  }
  function handleNeutralClick() {
    setNeutral(neutral + 1);
  }

  function handleBadClick() {
    setBad(bad + 1);
  }

 
  return (
    <div>
      <h1>give feedback</h1>
      <Button good={good} onClick={handleGoodClick} text="good"></Button>
      <Button neutral={neutral} onClick={handleNeutralClick} text="neutral"></Button>
      <Button bad={bad} onClick={handleBadClick} text="bad"></Button> 
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App