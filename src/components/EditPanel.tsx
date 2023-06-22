import {FC, MouseEvent} from "react";
import styles from '@/styles/ButtonEdit.module.scss'
import {ButtonDelete} from "@/components/buttons/ButtonDelete";
import {ButtonSave} from "@/components/buttons/ButtonSave";

interface EditPanelProps {
    edit: boolean;
    saveClick: Function;
    editOnChange: (event: MouseEvent<HTMLButtonElement>) => void
    handleDeleteBook: () => void
}


export const EditPanel:FC<EditPanelProps> = ({edit= false, saveClick=()=>{},handleDeleteBook=()=>{}, editOnChange =()=>{}})=>{
    return(
        <div className={styles.editPanel}>
            <div className={styles.buttonEdit}>
                <button onClick={editOnChange}>{edit ? "Exit" : "Edit"}</button>
            </div>
            {
                edit &&
                <>
                    <ButtonSave saveClick={saveClick} editOnChange={editOnChange}/>
                    <ButtonDelete deleteBook={handleDeleteBook}/>
                </>
            }
        </div>
    )
}