import {useState} from 'react'


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={ () => setGood(good + 1)}>good</button>
      <button onClick={ () => setNeutral(neutral +1)}>neutral</button>
      <button onClick={ () => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


const Statistics = (props) => {

  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  
  if( good + bad + neutral === 0)
    return (
      <p>No feedback given</p>
  )

  return (
    <div>
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good + bad + neutral}/>
        <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)}/>
        <StatisticLine text="positive" value={(good / (good + bad + neutral)) * 100 }/>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  
  const text = props.text
  const value = props.value

  if(text === "positive")
    return(
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>    
    </tr>
  )
}

const Button = (props) => {
  const text = props.text 
  const onClick = props.onClick

  return(
    <button onClick={onClick}>{text}</button>
  )

}

export default App