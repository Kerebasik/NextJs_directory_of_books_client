import {FC} from "react";

interface ContainerProps{
    children:FC
}

const Container:FC<ContainerProps>=({children})=>{
    return(
        <div className={'container'}>
            {children}
        </div>
    )
}

export default Container