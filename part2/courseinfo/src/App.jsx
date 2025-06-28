//const Header = (props) => <h1>{props.course}</h1>

const Course = ({course}) => (
  <>
    <h1>{course.name}</h1>
      {course.parts.map(part =>
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
    )}
  </>
)

const Total = ({course}) => (
  <>
    <b>
      total of {course.parts.reduce((accum, part) => accum + part.exercises,0)} exercises
    </b>
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  const result = course.parts.map(part => part.name)
  console.log(result)
  const totalExcercises =
    course.parts.reduce((accum, part) => accum + part.exercises,0)
  console.log('Total exercises', totalExcercises)

  return(
    <div>
      <Course course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
