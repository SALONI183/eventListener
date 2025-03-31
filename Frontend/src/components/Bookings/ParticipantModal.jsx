import './Participants.css';

const ParticipantModal = ({ participants, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Participants ({participants.length})</h3>
        <ul className="participant-list">
          {participants.map((p, index) => (
            <li key={index} className="participant-item">
              <img src={p.avatar} alt={p.name} className="participant-avatar" />
              <span className="participant-name">{p.name}</span>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ParticipantModal;
