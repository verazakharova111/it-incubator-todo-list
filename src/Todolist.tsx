import { FilterValueType } from "./App";
import { KeyboardEvent, ChangeEvent, useState } from "react";
export type taskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<taskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType, todolistId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValueType;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Field is required");
      console.log("ERROR");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
          className={error ? "error " : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {props.tasks.map((i) => {
          const onRemoveHandler = () => props.removeTask(i.id);
          const onChangeCheckBoxHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            props.changeTaskStatus(i.id, e.currentTarget.checked);
          };
          return (
            <li className={i.isDone ? "is-done" : ""} key={i.id}>
              <div>
                <input
                  onChange={onChangeCheckBoxHandler}
                  type="checkbox"
                  checked={i.isDone}
                />
              </div>
              <div>
                <span>{i.title} </span>
              </div>
              <div>
                <button onClick={onRemoveHandler}>x</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="filter-button">
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
