import {IBook} from "@/models/IBook";
import styles from '../../styles/BookPage.module.scss'
import {FC, useState, ChangeEvent, useEffect} from "react";
import Image from "next/image";
import imageStatic from '../../../public/image.png'
import {v4} from 'uuid';
import {EditPanel} from "@/components/EditPanel";
import {BookService} from "@/services/bookService";
import {useRouter} from "next/router";
import {AxiosResponse} from "axios";


interface BookPageProps{
    data:IBook
    imageUrl:string
}

export const Tags:FC = ({text}:string) =>{
    return(
        <font className={styles.tag}>
            {text}
        </font>
    )
}

export const BookPage:FC<BookPageProps> = ({data, imageUrl})=>{
    const router = useRouter()
    const [edit, setEdit] = useState<boolean>(false)
    const [description, setDescription] = useState<string>(data.description)
    const [tags, setTags] = useState<string[]>(data.tags)
    const [name, setName] = useState<string>(data.name)
    const [author, setAuthor] = useState<string>(data.author)
    const [image, setImage] = useState<string | null>(imageUrl)
    const [selectedImage, setSelectedImage] = useState<File>(null)
    const [valid, setValid] = useState(true);
    const [errorName, setErrorName] = useState<string | null>(null)
    const [errorAuthor, setErrorAuthor] = useState<string | null>(null);

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

    useEffect(()=>{
        return ()=>{
            setEdit(false);
            setImage(imageUrl)
            setSelectedImage(null)
        }
    },[])

    const toggleEditMode=()=>{
        setEdit(!edit)
        setTags(data.tags)
        setName(data.name)
        setAuthor(data.author)
        setDescription(data.description)
        if(edit && !selectedImage){
            setImage(imageUrl)
        }
    }

    const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) =>{
        setDescription(event.target.value)
    }
    const handleOnChangeInputName = (event: ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value)
    }
    const handleOnChangeInputAuthor = (event:ChangeEvent<HTMLInputElement>)=>{
        setAuthor(event.target.value)
    }
    const handleOnChangeInputTags = (event:ChangeEvent<HTMLInputElement>)=>{
        setTags(event.target.value.split(','))
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const inputFile = URL.createObjectURL(file)
            setImage(inputFile);
            setSelectedImage(file)
        }
    };

    const sendNewData = () =>{
        if(valid){
            BookService.updateBook({ _id:data._id,name, author,description, tags, imageFile:selectedImage}).then((res:AxiosResponse<IBook>)=>{
                setImage(URL.createObjectURL(selectedImage))
                setName(res.data.name)
                setAuthor(res.data.author)
                setDescription(res.data.description)
                setTags(res.data.tags)
            }).catch(()=>{
                toggleEditMode()
            })
        }
    }

    const handleDeleteBook = ()=>{
        BookService.deleteBookById(data._id).then(()=>{
            router.push('/books')
        })
    }

    return(
        <>
            <div className={styles.bookPage}>
                <div className={styles.bookPage__title}>
                    <div className={styles.bookPage__image} >
                        {
                            edit ?
                                <>
                                    <label className={styles.bookPage__image_editOn} htmlFor={"imageUpload"}>
                                        <Image alt={'book_img'} fill className={styles.bookPage__image__img} src={image === null ? imageStatic : image }/>
                                    </label>
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </>
                                :
                                <label>
                                    <Image alt={'book_img'}  fill className={styles.bookPage__image__img} src={image === null ? imageStatic : image }/>
                                </label>
                        }

                    </div>
                    <div className={styles.bookPage__content}>

                        {edit ?
                                <>
                                    {errorName && <div className={styles.bookPage__errorAlert}>{errorName}</div>}
                                    {errorAuthor && <div className={styles.bookPage__errorAlert}>{errorAuthor}</div>}
                                    <h3 className={styles.bookPage__content_name}>
                                        <p>Name:</p>
                                        <input value={name} onChange={handleOnChangeInputName}/>
                                    </h3>
                                    <p className={styles.bookPage__content_author}>
                                        <p>Author:</p>
                                        <input value={author} onChange={handleOnChangeInputAuthor}/>
                                    </p>
                                    <p className={styles.bookPage__content_tags}>
                                        <p>Tags:</p>
                                        <input value={tags.join(',')} onChange={handleOnChangeInputTags}/>
                                    </p>

                                </>
                            :
                                <>
                                    <h3 className={styles.bookPage__content_name}>{name}</h3>
                                    <p className={styles.bookPage__content_author}>{author}</p>
                                    <p className={styles.bookPage__content_tags}>{tags.map((item)=>{ return <Tags key={`${v4()}.${item}`} text={item}/>})}</p>

                                </>
                        }
                    </div>
                </div>
                <div className={styles.bookPage__description}>
                    {
                        edit ?
                            <>
                                <p>Description:</p>
                                <textarea
                                    value={description}
                                    onChange={handleOnChangeTextarea}
                                />
                            </>
                            :
                            <p>{description}</p>
                    }
                </div>
                <EditPanel edit={edit} saveClick={sendNewData} handleDeleteBook={handleDeleteBook} editOnChange={toggleEditMode} />
            </div>
        </>
    )
}