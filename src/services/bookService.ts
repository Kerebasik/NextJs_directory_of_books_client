import {axiosInstance} from "@/http/axios";
import axios,{AxiosResponse} from "axios";
import {IBook} from "@/models/IBook";

interface updateBookProps{
    _id:string,
    name:string,
    author:string,
    description:string,
    tags:Array<string>,
    imageFile:File
}

export interface createBook{
    name:string,
    author:string,
    description:string,
    tags:Array<string>,
    imageFile:File
}

class BookService {
    static async getAllBooks() {
        return await axiosInstance.get('/books').then((res:AxiosResponse<IBook[]>) =>res)
    }

    static async getBookById(id:string){
        return await axiosInstance.get(`/books/${id}`).then((res:AxiosResponse<IBook>) =>res)
    }

    static async deleteBookById(id:string){
        return await axiosInstance.delete(`/book/${id}`)
    }

    static async getImageBook(url:string){
        const response = await axios.get(`http://localhost:5000/${url}`, {
            responseType: 'arraybuffer',
        });
        const imageBuffer = Buffer.from(response.data, 'binary');
        const imageUrl = `data:${response.headers['content-type']};base64,${imageBuffer.toString('base64')}`;
        return imageUrl;
    }

    static async updateBook({_id, name, author, description,tags, imageFile}:updateBookProps){
        return await axiosInstance.put('/books', {_id:_id, name:name, author:author, description:description, tags:tags, image:imageFile},{
            headers:{
                'Content-Type': 'multipart/form-data;'
            }
        })
    }

    static async createBook(name, author, description, tags, imageFile){
        return await axiosInstance.post('/books',{name, author, description, tags, image:imageFile}, {
            headers:{
                'Content-Type': 'multipart/form-data;'
            }
        })
    }

}

export {BookService}
