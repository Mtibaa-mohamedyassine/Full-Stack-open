const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} /> 
      <Total course={props.course}/>
    </div>
  )
}


const Header = (props) => {
  console.log(props)

  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => {return <Part key={part.id} part={part.name} ex={part.exercises} />})}
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.ex}</p>
    </>
  )
}


const Total = (props) => {
  const total = props.course.parts.reduce((s, p) => {
    console.log('what is happening', s, p) 
    return s + p.exercises} , 0)

  return(
    <div>
      <p>total of {total} exercises</p>
    </div>
  )
}


export default Course