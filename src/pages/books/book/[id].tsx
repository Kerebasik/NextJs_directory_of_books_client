import {IBook} from "@/models/IBook";
import {FC} from "react";
import Head from "next/head";
import {router} from "next/client";

const Book:FC<IBook> = (book) =>{
    const { id } = router.query;
    return(<>
        <Head>
            <title>{id}</title>
        </Head>
        <div>Book {id}</div>
    </>)
}

export default Book