import { useCallback, useState } from 'react';

export default function EditTask({ toDo, toggleEdit, editToDo }) {
  const [newTaskInput, setNewTaskInput] = useState(toDo.task);
  
  const handleConfirmClick = useCallback(() => {
    editToDo(toDo.id, newTaskInput);
    toggleEdit();
  }, [toggleEdit, editToDo, newTaskInput, toDo.id])

  return (
    <div className="to-do-item">
      <input
        className="new-task-input"
        type="text"
        value={newTaskInput}
        onChange={(e) => setNewTaskInput(e.target.value)}
      />
      <div className="to-do-buttons">
        <button
          className="delete-button"
          onClick={toggleEdit}
        >
          Cancel
        </button>
        <button
          className="edit-button"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}