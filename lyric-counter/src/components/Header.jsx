import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Lyric Counter App</h1>
        </div>
    )
}

export default Header;