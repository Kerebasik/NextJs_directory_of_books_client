import {FC, MouseEvent} from "react";
import styles from '@/styles/ButtonEdit.module.scss'

interface EditPanelProps{
    edit:boolean;
    saveClick:Function;
    editOnChange:(event: MouseEvent<HTMLButtonElement>) => void
}

export const EditPanel:FC<EditPanelProps> = ({edit= false, saveClick=()=>{}, editOnChange =()=>{}})=>{


    return(
        <div className={styles.editPanel}>
            <div className={styles.buttonEdit}>
                <button onClick={editOnChange}>{edit ? "Exit" : "Edit"}</button>
            </div>
            {
                edit &&
                <div className={styles.buttonSave}>
                    <button onClick={
                        (e:MouseEvent<HTMLButtonElement>)=>{
                            editOnChange(e)
                            saveClick()
                        }
                    }>Save</button>
                </div>
            }
        </div>
    )
}