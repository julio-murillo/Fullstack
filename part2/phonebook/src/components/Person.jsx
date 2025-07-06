const Person =({person, deletePerson}) => {
    //console.log('Person component works', person)
    return (
        <div>
            {person.name} {person.number} {' '}
            <button onClick={deletePerson}>Delete</button>
        </div>
    )
}

export default Person