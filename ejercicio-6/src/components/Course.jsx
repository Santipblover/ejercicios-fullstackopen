const Course = (props) => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  console.log(props);

  const getTotalExercises = (parts) => {
    return parts.reduce((total, part) => total + part.exercises, 0);
  };

  return (
    <div>
      <h1>Web development curriculum</h1>
      <section>
        {course.map((courseName) => (
          <div key={courseName.id}>
            <h2>{courseName.name}</h2>
            {courseName.parts.map((part) => (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}
            <strong>
              Total of {getTotalExercises(courseName.parts)} exercises
            </strong>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Course;
