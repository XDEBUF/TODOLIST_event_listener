import React, { useState } from "react";
import Todo from "./Components/Todo";
import Form from "./Components/Form.jsx";
import FilterButton from "./Components/FilterButton.jsx";
import {nanoid} from "nanoid";
const FILTER_MAP = {
    Toutes: () => true,
    Actives: (task) => !task.completed,
    Completées: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) =>{
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState("Toutes");
    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // si cette tâche possède le même identifiant que la tâche éditée
            if (id === task.id) {
                // on utilise la décomposition objet afin
                // de construire un nouvel objet dont la
                // propriété `completed` est l'inverse
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }
     function deleteTask(id) {
            const remainingTasks = tasks.filter((task) => id !== task.id);
            setTasks(remainingTasks);
     }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));

    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
        setTasks([...tasks, newTask]);
    }
    const headingText = `${taskList.length} tâches restantes`;
    const tasksWords =
        taskList.length !== 1 ? "tâches restantes" : "tâche restante";
    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{headingText}</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    );
}

export default App;
