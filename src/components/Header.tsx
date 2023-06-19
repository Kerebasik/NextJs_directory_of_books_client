import {FC} from "react";
import Container from "./Container";
import Link from "next/link";
import styles from '@/styles/Header.module.scss'
import Image from "next/image";
import logo from '../../public/logo.png'

const Header:FC=()=>{
    return(
        <>
        <header className={styles.header}>
            <Container>
                <div className={styles.content}>
                    <Image src={logo} alt={'icon'} className={styles.logo} />
                    <nav className={styles.navigate}>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/books'}>Catalog</Link>
                        <Link href={'/terms'}>Terms of use</Link>
                    </nav>
                </div>
            </Container>
        </header>
            </>
    )
}

export default Header
