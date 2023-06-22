import {IBook} from "@/models/IBook";
import {FC, useEffect, useState} from "react";
import styles from '@/styles/Book.module.scss'
import imageStatic from '../../public/Book.png'
import Image from "next/image";
import {v4} from "uuid";
import {BookService} from "@/services/bookService";

interface BookProps{
    item:IBook
}

export const Book:FC<BookProps>=({item})=>{
    const [image, setImage] = useState<string>(imageStatic)

    useEffect(()=>{
        const reqImage = async ()=>{
            if(!!item.image){
                const imageFromAPI = await BookService.getImageBook(item.image)
                setImage(imageFromAPI)
            }
        }
        reqImage()
    })

    return(
        <div className={styles.book}>
            <div className={styles.image}>
                <Image src={image} quality={100} fill alt={'icon'}/>
            </div>
            <div className={styles.text}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.author}>{item.author}</p>
                <p className={styles.tags}>{item.tags.length!==0 && <>{item.tags.map(item=> <font key={`${v4}.${item}`}>{item}, </font>)}</>}</p>
                <p className={styles.description}></p>
            </div>
        </div>
    );
}