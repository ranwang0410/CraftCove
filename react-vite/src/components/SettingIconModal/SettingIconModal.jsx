import './SettingIconModal.css'

const SettingsModal = ({ isOpen,onClose,onEdit,onDelete}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
};
  if (!isOpen) return null;

    return (
      <div className="modal-backdrop"  onClick={onClose}>
        <div className="modal-content" onClick={stopPropagation}>

        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>

        </div>
      </div>
    );
  };

  export default SettingsModal
