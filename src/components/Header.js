import styles from '../css/Header.module.css'

export function Header() {
    return <header>
        <p className={`${styles.title}`}>
          Memoralia
        </p>
    </header>
}