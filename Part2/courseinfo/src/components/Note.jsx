const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} excercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((x) =>     <Part   key={x.id}    part={x}   /> )}

  </>


const Course = ({ course }) => 
  <>
      {console.log(course)}
      <Header course={course.name} />
     <Content parts={course.parts} />
     <Total sum={course.parts.reduce(function (acc, obj) { return acc + obj.exercises; }, 0)} />

  </>

const Cours = ({cour}) =>
  <body>
  
  <h1>Web development curriculum</h1>
  <div>
  {cour.map((x) => <Course key={x.id} course={x} /> )}
  </div>
 
  </body>
export default Cours