import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderUnauthorized from '../header-unauthorized/header-unauthorized.tsx';
import ArticleList from '../article-list/article-list.tsx';
import SingleArticle from '../single-article/single-article.tsx';
import SignUp from '../sign-up/sign-up.tsx';
import SignIn from '../sign-in/sign-in.tsx';
import HeaderAuthorized from '../header-authorized/header-authorized.tsx';
import EditProfile from '../edit-profile/edit-profile.tsx';
import NewArticle from '../new-article/new-article.tsx';
import EditArticle from '../edit-article/edit-article.tsx';
import ROUTES from "../../Utils/routes.ts";

import { useAppSelector } from '../../redux/store.ts';

import './App.scss';

function App() {
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    return (
    <>
      <ToastContainer position="bottom-right" />
      <header>{isUserLoggedIn ? <HeaderAuthorized /> : <HeaderUnauthorized />}</header>
      <main>
        <section>
          <Routes>
            <Route path={ROUTES.HOME} element={<ArticleList />} />
            <Route path={ROUTES.ARTICLES} element={<ArticleList />} />
            <Route path={ROUTES.SINGLE_ARTICLE} element={<SingleArticle />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.PROFILE} element={<EditProfile />}></Route>
            {isUserLoggedIn ? (
                <Route path={ROUTES.NEW_ARTICLE} element={<NewArticle />} />
            ) : (
                <Route path={ROUTES.NEW_ARTICLE} element={<Navigate to={ROUTES.SIGN_IN} replace />} />
            )}
            <Route path={ROUTES.EDIT_ARTICLE} element={<EditArticle />}></Route>
          </Routes>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
