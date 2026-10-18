export default function ConfirmDelete({ task, onConfirm, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Delete task?</h2>
        <p className="muted">
          "{task.title}" will be permanently removed. This cannot be undone.
        </p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="btn-primary btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
