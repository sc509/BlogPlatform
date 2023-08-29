import ReactMarkdown from 'react-markdown';
import { useDeleteArticleMutation, useGetArticleBySlugQuery } from '../../redux/articleApi.tsx';
import styles from './article-details.module.scss';
import { HeartOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { Button, message, Popconfirm } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { articleSlice } from '../../redux/slice/article-slice.ts';
import { useState } from 'react';

interface ArticleDetailsProps {
  slug: string;
}

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
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
    const userName = useAppSelector((state) => state.user.username);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {slug} = useParams<ArticleDetailsProps>();
    const [deleteArticle] = useDeleteArticleMutation(slug);
    const {deleteArticleFromStore} = articleSlice.actions;
    const [isDeleting, setIsDeleting] = useState(false);
    const {data: articleData, error, isLoading} = useGetArticleBySlugQuery(slug);
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
                                <div className={articlesSingleLikesCount}>
                                    <HeartOutlined/>
                                    <span className={articlesSingleLikes}>{article.favoritesCount}</span>
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
