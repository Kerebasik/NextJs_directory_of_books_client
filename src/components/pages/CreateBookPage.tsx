import Image from "next/image";
import styles from '@/styles/CreateBookPage.module.scss'
import staticImage from '../../../public/Book.png'
import {ChangeEvent, useEffect, useState} from "react";
import {ButtonSave} from "@/components/buttons/ButtonSave";
import {BookService} from "@/services/bookService";
import {useRouter} from "next/router";
import {AxiosResponse} from "axios";
import {IBook} from "@/models/IBook";


export const CreateBookPage = () =>{
    const [image, setImage] = useState<string>(staticImage)
    const [name, setName] = useState<string>(null);
    const [author, setAuthor] = useState<string>(null)
    const [tags, setTags] = useState<Array<string>>(null)
    const [description, setDescription] = useState<string>(null)
    const [selectedImage, setSelectedImage] = useState<File>(null)
    const [valid, setValid] = useState(false)
    const [errorName, setErrorName] = useState<string | null>(null)
    const [errorAuthor, setErrorAuthor] = useState<string | null>(null);
    const navigate = useRouter()

    const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        setImage(URL.createObjectURL(file))
        setSelectedImage(file)
    }

    const handleOnChangeName = (e:ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const handleOnChangeAuthor = (e:ChangeEvent<HTMLInputElement>) =>{
        setAuthor(e.target.value)
    }

    const handleOnChangeDescription = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        setDescription(e.target.value)
    }

    const handleOnChangeTags = (e:ChangeEvent<HTMLInputElement>)=>{
        setTags(e.target.value.split(','))
    }

    useEffect(()=>{
        return ()=>{
            setName(null)
            setSelectedImage(null)
            setAuthor(null)
            setTags(null)
            setDescription(null)
        }
    },[])

    const handleOnSubmitForm = ()=>{
        if(valid){
            BookService.createBook(name, author, description, tags, selectedImage).then( async (res:AxiosResponse<IBook>)=>{
                await navigate.push(`/books/book/${res.data._id}`, undefined, { shallow: true });
            })
        }
    }

    useEffect(()=>{
        if(author || name){
            if(author){
                setErrorAuthor(null)
            }
            if(name){
                setErrorName(null)
            }
            if(author && name){
                setErrorName(null)
                setErrorAuthor(null)
                setValid(true)
                return
            }
        }

        setValid(false)
        if(!name){
            setErrorName('Name is required')
        }
        if(!author){
            setErrorAuthor('Author is required')
        }
        return
    },[author, name])

    return(
            <div className={styles.createBook}>
                <div className={styles.createBook__image}>
                    <label htmlFor={'changeImage'}>
                        <Image width={200} height={200} src={image} alt={'image for book`s title'} />
                    </label>
                    <input
                        id="changeImage"
                        type="file"
                        accept="image/*"
                        onChange={handleOnChangeImage}
                    />
                </div>
                <div className={styles.createBook__content}>
                    {errorName && <div className={styles.createBook__errorAlert}>{errorName}</div>}
                    {errorAuthor && <div className={styles.createBook__errorAlert}>{errorAuthor}</div>}
                    <div className={styles.createBook__content_name}>
                        <p>Name:</p>
                        <input
                            type='text'
                            onChange={handleOnChangeName}
                        />
                    </div>
                    <div className={styles.createBook__content_author}>
                        <p>Author:</p>
                        <input
                            type='text'
                            onChange={handleOnChangeAuthor}
                        />
                    </div>
                    <div className={styles.createBook__content_tags}>
                        <p>Tags:</p>
                        <input
                            type='text'
                            onChange={handleOnChangeTags}
                        />
                    </div>
                    <div className={styles.createBook__content_description}>
                        <p>Description:</p>
                        <textarea
                            onChange={handleOnChangeDescription}
                        />
                    </div>
                </div>
                <div className={styles.createBook__buttonSave}>
                    <ButtonSave saveClick={handleOnSubmitForm} editOnChange={()=>{}} />
                </div>
            </div>
    )
}
