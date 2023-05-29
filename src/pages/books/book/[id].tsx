import {IBook} from "@/models/IBook";
import {FC} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

const Book:FC<IBook> = () =>{
    const { id } = useRouter();
    return(<>
        <Head>
            <title>{id}</title>
        </Head>
        <div>Book {id}</div>
    </>)
}

export default Book