

const App = () => {
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} 
               ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <p>{props.course}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <p>
        {props.p1} {props.ex1}
      </p>
      <p>
        {props.p2} {props.ex2}
      </p>
      <p>
        {props.p3} {props.ex3}
      </p>
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}
export default App 