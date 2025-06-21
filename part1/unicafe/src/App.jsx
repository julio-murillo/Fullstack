import { use, useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}
</button>

const Display = ({text, value}) => <div>{text} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing, value before',good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    console.log('increasing, value before',neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    console.log('increasing, value before',bad)
    setBad(bad + 1)
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
      <h2>statistics</h2>
      <Display
        text='good'
        value={good}
      />
       <Display
        text='neutral'
        value={neutral}
      />
       <Display
        text='bad'
        value={bad}
      />
    </div>
  )
}

export default App
