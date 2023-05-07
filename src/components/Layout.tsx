import {FC} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Content from "@/components/Content";
import Head from "next/head";

interface LayoutProps{
    children:FC
}

export const Layout:FC<LayoutProps> = ({children}) =>{
    return(
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <>
                <Header/>
                <Content>
                    { children }
                </Content>
                <Footer/>
            </>
        </>
    )
}