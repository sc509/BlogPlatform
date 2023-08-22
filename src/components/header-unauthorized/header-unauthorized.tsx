import styles from './header-unauthorized.module.scss';
import { Link } from 'react-router-dom';

function HeaderUnauthorized() {
  const { header, title, blockTitle, signIn, signUp, authorization } = styles;
  return (
    <div className={header}>
      <div className={blockTitle}>
        <h1 className={title}>
          <Link to="/articles">Realworld Blog</Link>
        </h1>
      </div>
      <div className={authorization}>
        <Link to="/sign-in">
          <button className={signIn}>Sign In</button>
        </Link>

        <Link to="/sign-up">
          <button className={signUp}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderUnauthorized;
