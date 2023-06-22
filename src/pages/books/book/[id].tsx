import {IBook} from "@/models/IBook";
import Head from "next/head";
import {BookService} from "@/services/bookService";
import {BookPage} from "@/components/pages/BookPage";

const Book = ({data, imageUrl}) =>{
    return(<>
        <Head>
            <title>{data.name}</title>
        </Head>
        <BookPage data={data} imageUrl={imageUrl}/>
    </>)
}

export const getStaticProps = async (context)=>{
    const id = context.params.id
    const res = await BookService.getBookById(id)

    let imageUrl:string | null
    if(res.data[0].image){
        imageUrl = await BookService.getImageBook(res.data[0].image)
    } else {
        imageUrl = null;
    }

    const data:IBook = res.data[0]

    return{
        props:{data, imageUrl}
    }
}

export const getStaticPaths = async ()=>{
    const res = await BookService.getAllBooks()
    const data = res.data

    const paths = data.map((item)=>{
        return {
            params:{
                id:item._id.toString()
            }
        }
    })

    return {
        paths,
        fallback:false
    }
}

export default Book