import './App.scss';
import Header from '../header/header.tsx';
import ArticleList from '../article-list/article-list.tsx';
import { Routes, Route } from 'react-router-dom';
import SingleArticle from "../single-article/single-article.tsx";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <section>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<SingleArticle />} />
          </Routes>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
