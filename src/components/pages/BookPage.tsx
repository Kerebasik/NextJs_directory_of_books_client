import {IBook} from "@/models/IBook";
import styles from '../../styles/BookPage.module.scss'
import {FC, useState, ChangeEvent, useEffect} from "react";
import Image from "next/image";
import imageStatic from '../../../public/image.png'
import {v4} from 'uuid';
import {EditPanel} from "@/components/EditPanel";
import {updateBook} from "@/http/updateBook";


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
    const [edit, setEdit] = useState<boolean>(false)
    const [description, setDescription] = useState<string>(data.description)
    const [tags, setTags] = useState<string[]>(data.tags)
    const [name, setName] = useState<string>(data.name)
    const [author, setAuthor] = useState<string>(data.author)
    const [image, setImage] = useState<string | null>(imageUrl)
    const [selectedImage, setSelectedImage] = useState<File>(null)

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
        updateBook({ _id:data._id,name, author,description, tags, imageFile:selectedImage}).then(()=>{
            setImage(URL.createObjectURL(selectedImage))
        }).catch(()=>{
             toggleEditMode()
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
                                    <h3 className={styles.bookPage__content_name}>
                                        <input value={name} onChange={handleOnChangeInputName}/>
                                    </h3>
                                    <p className={styles.bookPage__content_author}>
                                        <input value={author} onChange={handleOnChangeInputAuthor}/>
                                    </p>
                                    <p className={styles.bookPage__content_tags}>
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
                            <textarea
                                value={description}
                                onChange={handleOnChangeTextarea}
                            />
                            :
                            <p>{description}</p>
                    }
                </div>
                <EditPanel edit={edit} saveClick={sendNewData} editOnChange={toggleEditMode} />
            </div>
        </>
    )
}