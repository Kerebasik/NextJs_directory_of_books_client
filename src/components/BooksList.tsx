import {FC} from "react";
import {IBook} from "@/models/IBook";
import {Book} from "@/components/Book";
import styles from '@/styles/BooksList.module.scss'
import Link from "next/link";

interface BookListProps{
    data:IBook[]
}

const BooksList:FC<BookListProps>=({data})=>{
    return(
        <>
            <div className={styles.panel}>
                <Link href={'/books/book/create'}><button>Create</button></Link>
            </div>
            <div className={styles.list}>
                { data.map((item:IBook)=>(
                        <Link key={item._id} href={'/books/book/'+item._id}>
                            <Book key={item._id} item={item}/>
                        </Link>
                    )
                )}
            </div>
        </>
    )
}

export default BooksList