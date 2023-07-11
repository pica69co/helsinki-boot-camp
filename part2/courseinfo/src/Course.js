const Header = ({ course }) => <h1>{course.name}</h1>;


const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);


const Total = ({ parts }) => {
    let total = 0;
    total = parts.reduce((a, b) => a + b.exercises, 0);
    return <b>Total of {total} exercises</b>;
  };
  

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
