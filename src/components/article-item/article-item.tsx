import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { toast } from "react-toastify";

import { Article, Author } from '../../redux/types.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useDeleteLikeMutation, usePutLikeMutation } from "../../redux/articleApi.tsx";
import { articleSlice } from "../../redux/slice/article-slice.ts";
import formatDate from "../../Utils/form-date.ts";
import HeartIcon from "../../Utils/HeartIcon.tsx";

import styles from './article-item.module.scss';

interface ArticleItemProps {
  articles: Article;
  author?: Author;
  slug?: string;
}


function ArticleItem({ articles, author, slug }: ArticleItemProps) {
  const [isHeartClicked, setHeartClicked] = useState(articles.favorited);
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const { updateLikes } = articleSlice.actions;
  const [putLike] = usePutLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
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
    aritclesAuthors,
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
                        // @ts-ignore
                        newCount = result.data.article.favoritesCount;
                      } else {
                        const result = await putLike({ favoritedArticle: articles, slug: articles.slug });
                        // @ts-ignore
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
        <div className={aritclesAuthors}>
          <div className={aritcleAuthorContent}>
            <p className={articleName}>{articles.author.username}</p>
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
