import { useCallback, useState } from 'react';

export default function NewTask({ toggleAddToDoView, addNewToDo }) {
  const [newToDoInput, setNewToDoInput] = useState('');
  
  const handleAddClick = useCallback(() => {
    addNewToDo(newToDoInput);
    toggleAddToDoView();
  }, [addNewToDo, toggleAddToDoView, newToDoInput])

  return (
    <div className="to-do-item">
      <input
        className="new-task-input"
        type="text"
        value={newToDoInput}
        placeholder="New Task"
        onChange={(e) => setNewToDoInput(e.target.value)}
      />
      <div className="to-do-buttons">
        <button
          className="delete-button"
          onClick={toggleAddToDoView}
        >
          Cancel
        </button>
        <button
          className="edit-button"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
    </div>
  )
}