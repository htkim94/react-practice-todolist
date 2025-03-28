import ToDoItem from "./ToDoItem";
import "./ToDo.css";

export default function ToDoListContainer({
  isToDoListEmpty,
  filteredToDoList,
  toggleToDoCompletion,
  editToDo,
  removeToDo,
}) {
  return (
      Object.values(filteredToDoList).length ? 
      Object.values(filteredToDoList).map(toDo =>
        <ToDoItem
          key={toDo.id}
          toDo={toDo}
          toggleToDoCompletion={toggleToDoCompletion}
          editToDo={editToDo}
          removeToDo={removeToDo}
        />
      ) :
      <div className="to-do-item-empty">
        <p>List is empty!</p>
        {isToDoListEmpty && <p>Let's start the day by adding new task!</p>}
      </div>
  )
}
