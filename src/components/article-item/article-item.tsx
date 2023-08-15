import styles from './article-item.module.scss'
import {HeartOutlined} from "@ant-design/icons";
import rectangleImage from './Rectangle 1.png';

function articleItem() {
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
    } = styles;
    return (
        <div className={article}>
            <div className={articleTitleAndAuthor}>
                <div className={articleTitleBlock}>
                    <h1 className={articleTitle}>Some article title</h1>
                    <div className={aritcleLikes}>
                        <HeartOutlined/>
                        <span className={articleLikesCount}>32</span>
                    </div>
                </div>
                <div className={aritcleAuthor}>
                    <div className={aritcleAuthorContent}>
                        <p className={articleName}>John Doe</p>
                        <p className={articleDate}>March 5, 2020</p>
                    </div>
                    <div className={articlePhoto}>
                        <img src={rectangleImage} alt=""/>
                    </div>
                </div>
            </div>
            <div className={articleTag}>
                <button className={articleTagButton}>Tag1</button>
            </div>
            <div className={articleTextBlock}>
                <p className={articleText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    )
}

export default articleItem;