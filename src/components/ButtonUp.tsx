import {FC} from "react";
import styles from '@/styles/ButtonUp.module.scss'

export const ButtonUp:FC = ()=>{
    const onClickButtonHandler =()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    return(
        <div className={styles.buttonUp}>
            <button onClick={onClickButtonHandler}>UP</button>
        </div>
    )
}