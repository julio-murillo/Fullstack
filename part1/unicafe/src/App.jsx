import { use, useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}
</button>

const Stats = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const avg = (good+(bad*-1))/(good+neutral+bad)
  const pos = (good/(good+neutral+bad)*100)
  if (all) {
    return(
      <>
        <h2>statistics</h2>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {isNaN(avg) ? 0 : avg}</div>
        <div>positive {isNaN(pos) ? 0 : pos+'%'}</div>
     </>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing, value before',good)
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const increaseNeutral = () => {
    console.log('increasing, value before',neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const increaseBad = () => {
    console.log('increasing, value before',bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={increaseGood}
        text = 'good'
      />
       <Button 
        onClick={increaseNeutral}
        text = 'neutral'
      />
      <Button 
        onClick={increaseBad}
        text = 'bad'
      />
      <Stats
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
