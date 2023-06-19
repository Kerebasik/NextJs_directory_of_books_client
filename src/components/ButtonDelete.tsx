import {FC} from "react";
import styles from "@/styles/ButtonDelete.module.scss";

interface ButtonDeleteProps {
    deleteBook: () => void
}



export const ButtonDelete:FC<ButtonDeleteProps> = ({deleteBook})=>{
    return(
        <>
            <div className={styles.buttonDelete}>
                <button onClick={deleteBook}></button>
            </div>
        </>
    )
}
