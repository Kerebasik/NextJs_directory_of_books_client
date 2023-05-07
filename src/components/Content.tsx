import {FC} from "react";
import Container from "@/components/Container";

interface ContentProps{
    children:FC
}

const Content:FC<ContentProps>=({children})=>{
    return(
        <main>
            <Container>
                {children}
            </Container>
        </main>
    )
}

export default Content