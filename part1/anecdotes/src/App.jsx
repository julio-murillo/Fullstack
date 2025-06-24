import { useState } from "react"

const Button = ({text, action}) => 
  <button onClick={action}>{text}</button>

const Display = ({header, text, value}) => <>
  <h2>{header}</h2>
  <div>{text}</div>
  <div>has {value} {(value === 1) ? 'vote' : 'votes'}</div>
</>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  console.log ('Votes: ', votes)
  const getRandomInt = (max) => Math.floor(Math.random()*max)

  const selectAnecdote = () => {
    const selectedUpdated = getRandomInt(anecdotes.length)
    setSelected(selectedUpdated)
  }

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    setMostVoted(updateMostVoted(mostVoted, selected, copy[selected]))
  }

  const updateMostVoted = (mostVoted, selected, newVotes) => 
    (votes[mostVoted] > newVotes) ? mostVoted : selected

  return (
    <div>
      <Display
        header={'Anecdote of the day'}
        text={anecdotes[selected]}
        value={votes[selected]}
      />
      <Button
        action={updateVotes}
        text={'vote'}
      />
      <Button
        action={selectAnecdote}
        text={'next anecdote'}
      />
      <Display
        header={'Anecdote with most votes'}
        text={anecdotes[mostVoted]}
        value={votes[mostVoted]}
      />
    </div>
  )
}

export default App
