import styles from './article-item.module.scss';
import { Article, Author } from '../../redux/types.ts';
import { nanoid } from 'nanoid';
import {Link } from 'react-router-dom';
import { useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store.ts';
import {toast} from "react-toastify";
import {useDeleteLikeMutation, usePutLikeMutation} from "../../redux/articleApi.tsx";
import {articleSlice} from "../../redux/slice/article-slice.ts";

interface ArticleItemProps {
  articles: Article;
  author: Author;
  slug?: string;
}

function formatDate(dateString: number) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function ArticleItem({ articles, slug }: ArticleItemProps) {
  console.log(articles)
  const HeartIcon = ({ fill }) => (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={fill}
        stroke="black"
        strokeWidth="1"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
  const [isHeartClicked, setHeartClicked] = useState(articles.favorited);
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const { updateLikes } = articleSlice.actions;
  const [putLike, {error}] = usePutLikeMutation();
  const [deleteLike, {error: deleteError}] = useDeleteLikeMutation();
  const {
    article,
    articleTitleBlock,
    articleTitle,
    aritcleLikes,
    articleLikesCount,
    articleTag,
    articleTagButton,
    articleTextBlock,
    articleText,
    aritcleAuthor,
    articlePhoto,
    articleName,
    articleDate,
    articleTitleAndAuthor,
    aritcleAuthorContent,
    articleUserPhoto,
    aritcleLikesIcons,
  } = styles;

  return (
    <div className={article}>
      <div className={articleTitleAndAuthor}>
        <div className={articleTitleBlock}>
          <h1 className={articleTitle}>
            <Link to={`/articles/${articles.slug}`}>{articles.title}</Link>
          </h1>
          <div className={aritcleLikes}>
            <div
                onClick={async () => {
                  if (isUserLoggedIn) {
                    setHeartClicked(!isHeartClicked);
                    try {
                      let newCount;
                      if (isHeartClicked) {
                        const result = await deleteLike({ unFavoritedArticle: articles, slug: articles.slug });
                        newCount = result.data.article.favoritesCount;
                      } else {
                        const result = await putLike({ favoritedArticle: articles, slug: articles.slug });
                        newCount = result.data.article.favoritesCount;
                      }
                      dispatch(updateLikes({ slug: articles.slug, newCount }));
                    } catch (e) {
                      console.error("Failed to update like", e);
                    }
                  } else {
                    toast.error(`You must be logged in`);
                  }
                }}
                className={aritcleLikesIcons}
            >
              <HeartIcon fill={isHeartClicked ? 'red' : 'none'} />

            </div>
            <div className={articleLikesCount}>{articles.favoritesCount}</div>
          </div>
        </div>
        <div className={aritcleAuthor}>
          <div className={aritcleAuthorContent}>
            <p className={articleName}>{articles.author.username} lg</p>
            <p className={articleDate}>{formatDate(articles.createdAt)}</p>
          </div>
          <div className={articlePhoto}>
            <img src={articles.author.image} alt="User Avater" className={articleUserPhoto} />
          </div>
        </div>
      </div>
      <div className={articleTag}>
        {articles.tagList &&
          articles.tagList.map((tag) => {
            return (
              <button className={articleTagButton} key={nanoid()}>
                {tag}
              </button>
            );
          })}
      </div>
      <div className={articleTextBlock}>
        <p className={articleText}>{articles.description}</p>
      </div>
    </div>
  );
}

export default ArticleItem;
