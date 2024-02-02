import React from 'react';
import styles from '@/app/loading.module.css';

const Home: React.FC = () => {
  return (
    <main className={"flex flex-col items-center justify-center"}>
      <div>My Star Wars Codex</div>
      <div>Home section</div>
      <div>Favorites section</div>
      <div className={styles.saber}></div>
    </main>
  );
};

export default Home;
