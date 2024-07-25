const Persons = (props) => {
  return (
    <>
      {props.personFilter.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
