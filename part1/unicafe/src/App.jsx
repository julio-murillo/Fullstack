import { use, useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}
</button>

const Display = ({text, value}) => <div>{text} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    console.log('increasing, value before',good)
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)
    setAvg((updatedGood + (bad * -1)) / updatedAll)
    setPositive((updatedGood/updatedAll*100)+'%')
  }

  const increaseNeutral = () => {
    console.log('increasing, value before',neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = good + updatedNeutral + bad
    setAll(updatedAll)
    setAvg((good + (bad * -1)) / updatedAll)
    setPositive((good/updatedAll*100)+'%')
  }

  const increaseBad = () => {
    console.log('increasing, value before',bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = good + neutral + updatedBad
    setAll(updatedAll)
    setAvg((good + (updatedBad * -1)) / updatedAll)
    setPositive((good/updatedAll*100)+'%')
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
      <Display
        text = 'all'
        value = {all}
      />
      <Display
      text = 'average'
      value = {avg}
      />
      <Display
      text='positive'
      value = {positive}
      />
    </div>
  )
}

export default App
