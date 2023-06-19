import {axiosInstance} from "@/http/axios";

interface updateBookProps{
    _id:string,
    name:string,
    author:string,
    description:string,
    tags:Array<string>,
    imageFile:File
}

export const updateBook = ({_id, name, author, description,tags, imageFile}:updateBookProps)=>{

    return axiosInstance.put('/books', {_id:_id, name:name, author:author, description:description, tags:tags, image:imageFile},{
        headers:{
            'Content-Type': 'multipart/form-data;'
        }
    })
}