import "./DeleteConfirmCard.css";

const DeleteConfirmCard = ({ onDelete, onCancel, message }) => {
  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-card">
        <h3>Are you sure?</h3>
        <p>{message}</p>

        <div className="delete-popup-actions">
          <button className="delete-confirm-btn" onClick={onDelete}>
            Delete
          </button>
          <button className="delete-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmCard;
