const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  let sum = 0;
  //要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数。
  sum = course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((item) => {
        return <Part key={item.id} part={item} />;
      })}
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
