import styles from "@/styles/ButtonSave.module.scss";
import {FC} from "react";

interface ButtonSaveProps {
    saveClick: ()=>void;
    editOnChange: () => void
}

export const ButtonSave:FC<ButtonSaveProps> = ({editOnChange=()=>{}, saveClick=()=>{}})=>{
    const handelOnClick =()=>{
        editOnChange()
        saveClick()
    }

    return(
        <>
            <div className={styles.buttonSave}>
                <button onClick={
                    handelOnClick
                }>Save</button>
            </div>
        </>
    )
}