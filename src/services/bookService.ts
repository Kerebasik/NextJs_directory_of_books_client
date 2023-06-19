import {axiosInstance} from "@/http/axios";
import {AxiosResponse} from "axios";
import {IBook} from "@/models/IBook";

class BookService {
    static async getAllBooks() {
        return await axiosInstance.get('/books').then((res:AxiosResponse<IBook[]>) =>res)
    }

    static async getBookById(id:string){
        return await axiosInstance.get(`/books/${id}`).then((res:AxiosResponse<IBook>) =>res)
    }

}

export {BookService}
