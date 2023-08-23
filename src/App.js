import './App.css';
import StudentForm from './component/formStudent/StudentForm';
import StudentTable from './component/formStudent/StudentTable';

function App() {
  return (
    <div className="container ">
        <h1>React Form </h1>  
        <div>
            <StudentForm/>
            <StudentTable/>
        </div>
    </div>
  );
}

export default App;
