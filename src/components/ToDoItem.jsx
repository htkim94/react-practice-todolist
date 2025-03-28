import { useState, useCallback } from 'react';
import EditTask from './EditTask';

export default function ToDoItem({ toDo, toggleToDoCompletion, editToDo, removeToDo }) {
  const [inEditView, setInEditView] = useState(false);

  const handleCheckBoxOnChange = useCallback(() => {
    toggleToDoCompletion(toDo.id)
  }, [toDo.id, toggleToDoCompletion])

  const handleRemoveToDo = useCallback(() => {
    removeToDo(toDo.id)
  }, [toDo.id, removeToDo])

  const toggleEdit = useCallback(() => {
    setInEditView(!inEditView)
  }, [inEditView])

  return (
    <>
      { inEditView ? 
        <EditTask toDo={toDo} toggleEdit={toggleEdit} editToDo={editToDo} /> :
        <div className="to-do-item">
          <div className="to-do-main">
            <input
              className="to-do-checkbox"
              type="checkBox"
              checked={toDo.completed}
              onChange={handleCheckBoxOnChange}
            />
            <div className="to-do-content">
              <p>{ toDo.task }</p>
              <p>{ toDo.time }</p>
            </div>
          </div>
          <div className="to-do-buttons">
            <button
              className="delete-button"
              onClick={handleRemoveToDo}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={toggleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      }
    </>
  )
}