import {FaTimes} from 'react-icons/fa';

const Task = ({key, task, onDelete, onToggle}) => {
    
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3 key={key}>{task.text} <FaTimes style={{color:'red', cursor:'pointer'}} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;