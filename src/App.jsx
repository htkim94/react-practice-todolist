import { useCallback, useState } from "react";
import "./App.css";
import AddNewTask from "./components/AddNewTask";
import FilterDropDown from "./components/FilterDropDown";
import ToDoListContainer from "./components/ToDoListContainer";
import NewTask from "./components/NewTask";

function App() {
  const [isAddToDoView, setIsAddToDoView] = useState(false);
  const [toDoList, setToDoList] = useState({
    asdf1qwr23: {
      id: "asdf1qwr23",
      task: "Submit your timesheet",
      time: new Date().toLocaleString(),
      completed: false,
    },
    boiupqw24: {
      id: "boiupqw24",
      task: "Solve one daily leetcode question",
      time: new Date().toLocaleString(),
      completed: false,
    },
  });

  const [filteredToDoList, setFilteredToDoList] = useState(toDoList);
  const [filterValue, setFilterValue] = useState("all");

  const refreshFilterToDoList = useCallback((toDoListCopy, currentFilterStatus) => {
    if (currentFilterStatus !== "all") {
      const filterStatusBoolean = (currentFilterStatus === "completed");
      setFilteredToDoList(Object.values(toDoListCopy).reduce((acc, cur) => {
        if (cur.completed === filterStatusBoolean) {
          acc[cur.id] = cur;
        }
        return acc;
      }, {}));
    } else {
      setFilteredToDoList(toDoListCopy);
    }
  }, [setFilteredToDoList]);
  
  const toggleAddToDoView = useCallback(() => {
    setIsAddToDoView(!isAddToDoView);
  }, [isAddToDoView]);

  const filterToDoList = useCallback(
    (value) => {
      setFilterValue(value);
      refreshFilterToDoList({ ...toDoList }, value);
    },
    [setFilterValue, refreshFilterToDoList, toDoList]
  );

  const toggleToDoCompletion = useCallback(
    (id) => {
      const toDoListCopy = { ...toDoList };
      toDoList[id].completed = !toDoList[id].completed;
      setToDoList(toDoListCopy);
      refreshFilterToDoList(toDoListCopy, filterValue);
    },
    [toDoList, filterValue, refreshFilterToDoList]
  );

  const removeToDo = useCallback(
    (id) => {
      const toDoListCopy = { ...toDoList }
      delete toDoListCopy[id]
      setToDoList(toDoListCopy);
      refreshFilterToDoList(toDoListCopy, filterValue);
    },
    [toDoList, filterValue, refreshFilterToDoList]
  );

  const addNewToDo = useCallback((newTaskInput) => {
    const newToDoId = Date.now();
    const newToDoObject = {
      id: newToDoId,
      task: '',
      time: new Date().toLocaleString(),
      completed: false,
    };
    newToDoObject.task = newTaskInput;
    const toDoListCopy = { ...toDoList };
    toDoListCopy[newToDoId] = newToDoObject;
    setToDoList(toDoListCopy);
    refreshFilterToDoList(toDoListCopy, filterValue);
  }, [toDoList, filterValue, refreshFilterToDoList])

  const editToDo = useCallback((id, newToDoInput) => {
    const toDoListCopy = { ...toDoList };
    toDoListCopy[id].task = newToDoInput;
    setToDoList(toDoListCopy);
    refreshFilterToDoList(toDoListCopy, filterValue);
  }, [toDoList, filterValue, refreshFilterToDoList]);

  return (
    <main className="main-container">
      <h1>To Do List</h1>
      <div className="button-container">
        <AddNewTask toggleAddToDoView={toggleAddToDoView} />
        <FilterDropDown
          filterValue={filterValue}
          filterToDoList={filterToDoList}
        />
      </div>
      <section className="view-container">
        {isAddToDoView ? (
          <NewTask
            toggleAddToDoView={toggleAddToDoView}
            addNewToDo={addNewToDo}
          />
        ) : (
          <ToDoListContainer
            isToDoListEmpty={!Object.keys(toDoList).length}
            filteredToDoList={filteredToDoList}
            toggleToDoCompletion={toggleToDoCompletion}
            editToDo={editToDo}
            removeToDo={removeToDo}
          />
        )}
      </section>
    </main>
  );
}

export default App;
