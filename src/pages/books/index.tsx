import {IBook} from "@/models/IBook";
import BooksList from "@/components/BooksList";
import Head from "next/head";
import {BookService} from "@/services/bookService";

export default function Books ({data}:IBook[]){
    return(
        <>
            <Head>
                <title>Catalog</title>
            </Head>
            <BooksList data={data} />
        </>

    )
}

export async function getServerSideProps() {
    const res = await BookService.getAllBooks()
    const data = res.data
    return { props: { data } };
}
