import './App.scss'
import Header from "../header/header.tsx";
import ArticleList from "../article-list/article-list.tsx";
import Paginations from "../pagination/paginations.tsx";

function App() {

  return (
    <>
      <header>
          <Header/>
      </header>
      <main>
        <section>
            <ArticleList/>
        </section>
      </main>
      <footer>
          <Paginations/>
      </footer>
    </>
  )
}

export default App
