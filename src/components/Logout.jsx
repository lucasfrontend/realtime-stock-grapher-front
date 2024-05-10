import { FaSignOutAlt } from 'react-icons/fa';

const Logout = ({ onLogout }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <div className="d-flex justify-content-end p-4">
      <div onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
        <FaSignOutAlt size={24} />
      </div>
    </div>
  );
};

export default Logout;