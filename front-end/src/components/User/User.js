import { Menu } from '../';
import { useState } from 'react';

import styles from './User.module.css';

const User = ({ user, setUser, setToken }) => {
  const [showMenu, setShowMenu] = useState(false);

  function handleProfileClick(event) {
    if (event.target.localName === 'img') {
      setShowMenu((prev) => !prev);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <div className={styles.flex}>
      <h4 className={styles.name}>
        {user.firstName} {user.lastName}
      </h4>
      <div className={styles.profileContainer} onClick={handleProfileClick}>
        <img src={user.profileImage} alt='profile' className={styles.image} />
        {showMenu && <Menu setUser={setUser} setToken={setToken} />}
      </div>
    </div>
  );
};

export default User;
