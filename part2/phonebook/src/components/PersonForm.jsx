const PersonForm = ({name, onNameChange, number, onNumberChange, onButtonClick}) =>
(
  <>
    <form id='PhonebookEntries'>
      <div>
        name: <input
          id='name'
          value={name}
          onChange={onNameChange}
          autoComplete='on'/>
      </div>
      <div>
        number: <input
          id='number'
          value={number}
          onChange={onNumberChange} />
      </div>
      <div>
        <button type='submit' onClick={onButtonClick}>add</button>
      </div>
    </form>
  </>
)

export default PersonForm