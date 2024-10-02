import { useState } from "react";
import { taskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValueType = "completed" | "active" | "all";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
function App() {
  let initialTask = [
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ];

  let [tasks, setTasks] = useState<Array<taskType>>(initialTask);
  let [todolists, setTodoList] = useState<Array<TodoListType>>([
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy", filter: "all" },
  ]);
  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => {
      if (t.id !== id) return true;
    });
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoList([...todolists]);
    }
  }

  return (
    <div className="body">
      <div className="App">
        {todolists.map((tl) => {
          let tasksForTodoList = tasks;
          if (tl.filter === "completed") {
            tasksForTodoList = tasks.filter((t) => t.isDone === true);
          }

          if (tl.filter === "active") {
            tasksForTodoList = tasks.filter((t) => t.isDone === false);
          }
          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
