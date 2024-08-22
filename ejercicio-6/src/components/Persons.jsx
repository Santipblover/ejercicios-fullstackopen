const Persons = ({ personFilter, handleDeletePerson }) => {
  return (
    <>
      {personFilter.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeletePerson(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
