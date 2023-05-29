import {FC} from "react";

import styles from '@/styles/Container.module.scss'

interface ContainerProps{
    children:FC
}

const Container:FC<ContainerProps>=({children})=>{
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Container