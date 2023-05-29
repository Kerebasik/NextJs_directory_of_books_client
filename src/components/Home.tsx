import Link from "next/link";

const Home = ()=>{
    return(
        <div>
            <h1>Home</h1>
            <Link href={'/books/book/1'}>Link</Link>
        </div>
    )
}

export default Home