import {FC} from "react";
import Container from "./Container";
import styles from '@/styles/Content.module.scss'

interface ContentProps{
    children:FC
}

const Content:FC<ContentProps>=({children})=>{
    return(
        <main className={styles.main}>
            <Container>
                {children}
            </Container>
        </main>
    )
}

export default Content