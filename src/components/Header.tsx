import {FC} from "react";
import Container from "./Container";
import Link from "next/link";
import styles from '@/styles/Header.module.scss'

const Header:FC=()=>{
    return(
        <header className={styles.header}>
            <Container>
                <nav className={styles.navigate}>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/books/book/1'}>Catalog</Link>
                    <Link href={'/books'}>Terms of use</Link>
                </nav>
            </Container>
        </header>
    )
}

export default Header
