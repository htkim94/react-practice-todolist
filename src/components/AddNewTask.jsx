export default function AddButton({ toggleAddToDoView }) {
  return (
    <button
      className="add-new-task-button"
      onClick={toggleAddToDoView}
    >
      Add Task
    </button>
  )
}