
const Persons = (props) => {
  return(
    props.personsToShow.map((person) => (
      <div  key={person.id}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => {props.handleDelete(person.id)}}>Delete</button>
      </div>
    ))
  )
}



export default Persons