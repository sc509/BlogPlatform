import ReactMarkdown from 'react-markdown';
import {
    useDeleteArticleMutation,
    useDeleteLikeMutation,
    useGetArticleBySlugQuery,
    usePutLikeMutation
} from '../../redux/articleApi.tsx';
import styles from './article-details.module.scss';
    import { nanoid } from 'nanoid';
import { Button, message, Popconfirm } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { articleSlice } from '../../redux/slice/article-slice.ts';
import {useEffect, useState} from 'react';
import {toast} from "react-toastify";

interface ArticleDetailsProps {
  slug: string;
}

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  message.error('Click on No');
};

interface ArticleDetailsProps {
  slug: string;
}

function formatDate(dateString: number) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function ArticleDetails() {
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
    const userName = useAppSelector((state) => state.user.username);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {slug} = useParams<ArticleDetailsProps>();
    const [deleteArticle] = useDeleteArticleMutation(slug);
    const {deleteArticleFromStore} = articleSlice.actions;
    const [isDeleting, setIsDeleting] = useState(false);
    const {data: articleData, error, isLoading} = useGetArticleBySlugQuery(slug);
    const [isHeartClicked, setHeartClicked] = useState(articleData?.article.favorited);
    const [favoritesCount, setFavoritesCount] = useState(articleData?.article.favoritesCount);

    const [putLike] = usePutLikeMutation();
    const [deleteLike, { error: deleteError }] = useDeleteLikeMutation();
    const { updateLikes } = articleSlice.actions;
    const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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
                    const result = await deleteLike({ unFavoritedArticle: articleData?.article, slug: slug });
                    newCount = result.data.article.favoritesCount;
                    setFavoritesCount(newCount);
                    console.log(result.data.article.favoritesCount)
                } else {
                    const result = await putLike({ favoritedArticle: articleData?.article, slug: slug });
                    newCount = result.data.article.favoritesCount;
                    setFavoritesCount(newCount);
                }
                dispatch(updateLikes({ slug: slug, newCount }));
            } catch (e) {
                toast.error("Failed to update like", e);
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
    } else {
        const article = articleData.article;
        const isUserArticle = userName === article.author.username;
        const confirm = async (e: React.MouseEvent<HTMLElement>) => {
            setIsDeleting(true);
            try {
                await deleteArticle(slug);
                message.success('The article has been successfully deleted');
                dispatch(deleteArticleFromStore(slug));
                setIsDeleting(false);
                navigate('/');
                window.location.reload()
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
                                <h2 className={articlesSingleText}>{article.title}</h2>
                                <div className={articlesSingleLikesCount} onClick={handleLikeClick}>
                                    <HeartIcon fill={isHeartClicked ? 'red' : 'none'} />
                                    <span className={articlesSingleLikes}>{favoritesCount}</span>
                                </div>
                            </div>
                            <div className={articlesSingleAuthor}>
                                <div className={articlesSingleAuthorContent}>
                                    <p className={articlesSingleName}>{article.author.username}</p>
                                    <p className={articlesSingleDate}>{formatDate(article.createdAt)}</p>
                                </div>
                                <div className={articlesSingPhoto}>
                                    <img src={article.author.image} alt="User Avater"
                                         className={articlesSingleUserPhoto}/>
                                </div>
                            </div>
                        </div>
                        <div className={articlesSingleTag}>
                            {article.tagList &&
                                article.tagList.map((tag) => {
                                    return (
                                        <button className={articlesSingleTagButton} key={nanoid()}>
                                            {tag}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className={articlesSingleDescription}>
                            <div>
                                <p className={articlesSingleDescriptionText}>{article.description}</p>
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
                                        <Button danger className={articlesSingleDescriptionDelete}>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                    <Link to={`/articles/${slug}/edit`}>
                                        <button className={articlesSingleDescriptionEdit}>Edit</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className={markDown}>
                            <ReactMarkdown>{article.body}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ArticleDetails;
