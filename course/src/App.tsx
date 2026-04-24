import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import './App.css';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      partName: "Fundamentals",
      exerciseCount: 10
    },
    {
      partName: "Using props to pass data",
      exerciseCount: 7
    },
    {
      partName: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;