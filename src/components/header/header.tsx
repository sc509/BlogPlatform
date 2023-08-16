import styles from './header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
  const { header, title, blockTitle, signIn, signUp, authorization } = styles;
  return (
    <div className={header}>
      <div className={blockTitle}>
        <h1 className={title}>
          <Link to="/articles">Realworld Blog</Link>
        </h1>
      </div>
      <div className={authorization}>
        <button className={signIn}>Sign In</button>
        <button className={signUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;