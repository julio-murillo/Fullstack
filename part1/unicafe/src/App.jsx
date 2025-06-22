import { use, useState } from 'react'

const Button = ({ onClick, text }) => <button id={text} onClick={onClick}>{text}
</button>

const Stats = ({display, stats}) => {
  if (display) {
    return (
      <div>
        <h2>statistics</h2>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key}> {key} {value} </div>
          ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2>No feedback has been provided yet!</h2>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [stats, setStats] = useState(
    {good: 0, 
    neutral: 0, 
    bad: 0, 
    all: 0, 
    avg: 0, 
    positive: 0}
  )

  const increaseGood = () => {
    const updatedGood = stats.good + 1
    const updatedAll = updatedGood + stats.neutral + stats.bad
    const newStats = {
      ...stats, 
      good: updatedGood,
      all: updatedAll,
      avg: (updatedGood + (stats.bad * -1)) / updatedAll,
      positive: (updatedGood / updatedAll * 100) + '%'
    }
    setStats(newStats)
  }
  
  const increaseNeutral = () => {
    const updatedNeutral = stats.neutral + 1
    const updatedAll = stats.all + 1
    const newStats = {
      ...stats,
      neutral: updatedNeutral,
      all: updatedAll,
      positive: (stats.good / updatedAll * 100) + '%'
    }
    setStats(newStats)
  }

  const increaseBad = () => {
    const updatedBad = stats.bad + 1
    const updatedAll = stats.all + 1
    const newStats = {
      ...stats,
      bad: updatedBad,
      all: updatedAll,
      avg: (stats.good + (updatedBad * -1)) / updatedAll,
      positive: (stats.good / updatedAll * 100) + '%'
    }
    setStats(newStats)
  }

  return (
    <>
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
        display={stats.all}
        stats={stats}
      />
    </>
  )
}

export default App
