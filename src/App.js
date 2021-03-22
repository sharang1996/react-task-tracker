import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    
    const getTasks = async ()=>{
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();

  }, []);

  //fetch tasks
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    
    return data;

  };

  //fetch task
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    
    return data;

  };

  //add task
  const onAdd = async (task)=>{
    
    const res = await fetch('http://localhost:5000/tasks', {
      method:'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(task)
    });

    //promise, you need to await it!
    const data = await res.json();
    //console.log(data);
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random()*1000) +1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
    // console.log(newTask);
  };


  //delete task
  const onDelete = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
    setTasks(tasks.filter(task=>task.id!==id));
  };

  //toggle reminder
  const onToggle = async (id)=>{
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder:!taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(tasks.map(task => (task.id === id ? data : task)));
    console.log(tasks);

  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        <Route path="/" exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={onAdd} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
