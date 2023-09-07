import styles from './header-unauthorized.module.scss';
import { Link } from 'react-router-dom';
import ROUTES from "../../Utils/routes.ts";

function HeaderUnauthorized() {
  const { header, title, blockTitle, signIn, signUp, authorization } = styles;
  return (
    <div className={header}>
      <div className={blockTitle}>
        <h1 className={title}>
          <Link to={ROUTES.HOME}>Realworld Blog</Link>
        </h1>
      </div>
      <div className={authorization}>
        <Link to={ROUTES.SIGN_IN}>
          <button className={signIn}>Sign In</button>
        </Link>

        <Link to={ROUTES.SIGN_UP}>
          <button className={signUp}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderUnauthorized;
