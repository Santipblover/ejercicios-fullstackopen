const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.number} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={props.personDetected}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
