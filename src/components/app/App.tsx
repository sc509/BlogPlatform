import './App.scss';
import HeaderUnauthorized from '../header-unauthorized/header-unauthorized.tsx';
import ArticleList from '../article-list/article-list.tsx';
import {Routes, Route, Navigate} from 'react-router-dom';
import SingleArticle from '../single-article/single-article.tsx';
import SignUp from '../sign-up/sign-up.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from '../sign-in/sign-in.tsx';
import HeaderAuthorized from '../header-authorized/header-authorized.tsx';
import { useAppSelector } from '../../redux/store.ts';
import EditProfile from '../edit-profile/edit-profile.tsx';
import NewArticle from "../new-article/new-article.tsx";
import EditArticle from "../edit-article/edit-article.tsx";
import { useParams } from 'react-router-dom';

function App() {
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const { slug } = useParams();
    return (
    <>
      <ToastContainer position="bottom-right" />
      <header>{isUserLoggedIn ? <HeaderAuthorized /> : <HeaderUnauthorized />}</header>
      <main>
        <section>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<SingleArticle />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<EditProfile />}></Route>
            {isUserLoggedIn ? (
                <Route path="/new-article" element={<NewArticle />} />
            ) : (
                <Route path="/new-article" element={<Navigate to="/sign-in" replace />} />
            )}
            <Route path="/articles/:slug/edit" element={<EditArticle />}></Route>
          </Routes>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
