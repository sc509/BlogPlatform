import styles from './header.module.scss';

function Header() {
    const {header, title,blockTitle,signIn, signUp, authorization} = styles;
    return (
        <div className={header}>
            <div className={blockTitle}><h1 className={title}>Realworld Blog</h1></div>
            <div className={authorization}>
                <button className={signIn}>Sign In</button>
                <button className={signUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default Header;