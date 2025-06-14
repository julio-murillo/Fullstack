const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old and your height is {props.height}
      </p>
    </>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + age} height={'5 feet 2'} />
      <Hello name={name} age={age} height={0}/>
    </>
  )
}

export default App
