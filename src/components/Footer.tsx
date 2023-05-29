import {FC} from "react";
import Container from "./Container";
import styles from '@/styles/Footer.module.scss'

const Footer:FC = () => {
  return(
        <footer className={styles.footer}>
            <Container>
                <div className={styles.text}>
                    @Copyright 2023
                </div>
            </Container>
        </footer>
  )
}

export default Footer