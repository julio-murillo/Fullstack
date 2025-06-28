const Course = ({course}) => (
    <>
      <h2>{course.name}</h2>
        {course.parts.map(part =>
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
      )}
      <Total course={course}/>
    </>
  )
  
  const Total = ({course}) => (
    <>
      <b>
        total of {course.parts.reduce((accum, part) => accum + part.exercises,0)} exercises
      </b>
    </>
  )

  export default Course