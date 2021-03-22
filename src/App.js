import {useState} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([{
    "id": 1,
    "text": "Doctors Appointment",
    "day": "Feb 5th at 2:30pm",
    "reminder": true
  },
  {
    "id": 2,
    "text": "Meeting at School",
    "day": "Feb 6th at 1:30pm",
    "reminder": true
  },
  {
    "id": 3,
    "text": "Food Shopping",
    "day": "Feb 5th at 2:30pm",
    "reminder": false
  }]);

  //add task
  const onAdd = (task)=>{
    const id = Math.floor(Math.random()*1000) +1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
    console.log(newTask);
  };


  //delete task
  const onDelete = (id)=>{
    setTasks(tasks.filter(task=>task.id!==id));
  };

  //toggle reminder
  const onToggle = (id)=>{
    console.log(id);
    setTasks(tasks.map(task => (task.id === id ? { ...task, reminder: !task.reminder } : task)));
    console.log(tasks);

  }

  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={onAdd}/>}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle}/>) : ("No tasks to show")}
    </div>
  );
}

export default App;
