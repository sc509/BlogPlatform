import styles from './header-authorized.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import AccountPhoto from '../../assets/Rectangle 1.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { actions } from '../../redux/slice/auth-slice.ts';
import { toast } from 'react-toastify';

function HeaderAuthorized() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const image = useAppSelector((state) => state.user.image);
  const userName = useAppSelector((state) => state.user.username);
  const { header, title, blockTitle, link, authorization, createArticle, profile, profileName, profilePhoto, logOut } =
    styles;

  const handleLogOut = () => {
    dispatch(actions.logOut());
    navigate('/');
    toast.success("You've successfully exited");
  };

  return (
    <div className={header}>
      <div className={blockTitle}>
        <h1 className={title}>
          <Link to="/articles">Realworld Blog</Link>
        </h1>
      </div>
      <div className={authorization}>
        <Link to="/new-article">
          <button className={createArticle}>Create article</button>
        </Link>
        <Link to="/profile" className={link}>
          <div className={profile}>
            <p className={profileName}>{userName}</p>
            <img src={image || AccountPhoto} alt="Account Photo" className={profilePhoto} />
          </div>
        </Link>
        <button className={logOut} onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default HeaderAuthorized;
