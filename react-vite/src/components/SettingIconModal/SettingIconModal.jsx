import './SettingIconModal.css'

const SettingsModal = ({ isOpen,onEdit,onDelete}) => {

  if (!isOpen) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">

          <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>

        </div>
      </div>
    );
  };

  export default SettingsModal
