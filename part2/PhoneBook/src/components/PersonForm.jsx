

const PersonForm = (props) => {
  const {addPerson, handleNewChange, handleChangePhone, newName, newPhone} = props

  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNewChange} value={newName} />
        </div>
        <div>
          phone: <input onChange={handleChangePhone} value={newPhone} />
        </div>
        <button type="submit" >add</button>
    </form>
  )
}

export default PersonForm