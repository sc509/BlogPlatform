import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useDeleteArticleMutation, useDeleteLikeMutation, useGetArticleBySlugQuery, usePutLikeMutation } from '../../redux/articleApi.tsx';
import { articleSlice } from '../../redux/slice/article-slice.ts';
import { Article } from '../../redux/types.ts';

import HeartIcon from "../../Utils/HeartIcon.tsx";
import formatDate from "../../Utils/form-date.ts";
import handleImageError from "../../Utils/handleImageError.ts";
import ROUTES from "../../Utils/routes.ts";

import { nanoid } from 'nanoid';
import { Button, message, Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import { Link, useParams, useNavigate } from 'react-router-dom';

import styles from './article-details.module.scss';

const cancel = () => {
  toast.error('Click on No');
};

function ArticleDetails() {
  const userName = useAppSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { slug } = useParams<string>();
  const [deleteArticle] = useDeleteArticleMutation();

  if (!slug) {
    return <div>Slug не определен</div>;
  }
  const { deleteArticleFromStore } = articleSlice.actions;
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: articleData, error, isLoading } = useGetArticleBySlugQuery(slug);
  const [isHeartClicked, setHeartClicked] = useState(articleData?.article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(articleData?.article.favoritesCount);

  const [putLike] = usePutLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const { updateLikes } = articleSlice.actions;
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const article: Article | undefined = articleData?.article;

  useEffect(() => {
    setHeartClicked(articleData?.article.favorited);
    setFavoritesCount(articleData?.article.favoritesCount);
  }, [articleData]);

  const handleLikeClick = async () => {
    if (isUserLoggedIn) {
      setHeartClicked(!isHeartClicked);
      try {
        let newCount;
        if (isHeartClicked) {
          const result = await deleteLike({ unFavoritedArticle: article, slug: slug });
          // @ts-ignore
          newCount = result.data.article.favoritesCount;
          setFavoritesCount(newCount);
        } else {
          const result = await putLike({ favoritedArticle: article, slug: slug });
          // @ts-ignore
          newCount = result.data.article.favoritesCount;
          setFavoritesCount(newCount);
        }
        dispatch(updateLikes({ slug: slug, newCount }));
      } catch (e) {
        toast.error('Failed to update like', e);
      }
    } else {
      toast.error(`You must be logged in`);
    }
  };
  const {
    articlesSingle,
    articlesSingleText,
    articlesSingleTextAndLikes,
    articlesSingleLikesCount,
    articlesSingleLikes,
    articlesSingleTag,
    articlesSingleTagButton,
    articlesSingleAuthor,
    articlesSingleAuthorContent,
    articlesSingleName,
    articlesSingleDate,
    articlesSingPhoto,
    articlesSingleUserPhoto,
    articlesSingleLikesAndAuthor,
    markDown,
    articlesSingleDescription,
    articlesSingleDescriptionText,
    articlesSingleDescriptionDelete,
    articlesSingleDescriptionEdit,
    articlesSingleDescriptionButtons,
  } = styles;
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: Произошла ошибка во время загрузки</div>;
  } else if (!article) {
    return <div>Article not found</div>;
  } else {
    const articles = articleData.article;
    const isUserArticle = userName === articles.author.username;
    const confirm = async () => {
      setIsDeleting(true);
      try {
        await deleteArticle(slug);
        dispatch(deleteArticleFromStore(slug));
        setIsDeleting(false);
        navigate('/');
        window.location.reload();
        message.success('The article has been successfully deleted');
      } catch (error) {
        setIsDeleting(false);
        message.error('An error occurred when deleting an article');
      }
    };
    if (isDeleting) {
      return <div>Deleting...</div>;
    } else {
      return (
        <div>
          <div className={articlesSingle}>
            <div className={articlesSingleLikesAndAuthor}>
              <div className={articlesSingleTextAndLikes}>
                <h2 className={articlesSingleText}>{articles.title}</h2>
                <div className={articlesSingleLikesCount} onClick={handleLikeClick}>
                  <HeartIcon fill={isHeartClicked ? 'red' : 'none'} />
                  <span className={articlesSingleLikes}>{favoritesCount}</span>
                </div>
              </div>
              <div className={articlesSingleAuthor}>
                <div className={articlesSingleAuthorContent}>
                  <p className={articlesSingleName}>{articles.author.username}</p>
                  <p className={articlesSingleDate}>{formatDate(articles.createdAt)}</p>
                </div>
                <div className={articlesSingPhoto}>
                  <img src={articles.author.image} alt="User Avater"  onError={handleImageError} className={articlesSingleUserPhoto} />
                </div>
              </div>
            </div>
            <div className={articlesSingleTag}>
              {articles.tagList &&
                articles.tagList.map((tag) => {
                  return (
                    <button className={articlesSingleTagButton} key={nanoid()}>
                      {tag}
                    </button>
                  );
                })}
            </div>
            <div className={articlesSingleDescription}>
              <div>
                <p className={articlesSingleDescriptionText}>{articles.description}</p>
              </div>
              {isUserArticle && (
                <div className={articlesSingleDescriptionButtons}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger className={articlesSingleDescriptionDelete as string}>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Link to={ROUTES.EDIT_ARTICLE.replace(':slug', slug)}>
                    <button className={articlesSingleDescriptionEdit}>Edit</button>
                  </Link>
                </div>
              )}
            </div>
            <div className={markDown}>
              <ReactMarkdown>{articles.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ArticleDetails;
