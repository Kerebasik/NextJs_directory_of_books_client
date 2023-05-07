import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {Layout} from "@/components/Layout";
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(()=>{
        document.getElementById('__next').classList.add('wrapper');
        return ()=>{
            document.getElementById('__next').classList.remove('wrapper')
        }
    },[])
  return <Layout>
            <Component {...pageProps} />
          </Layout>
}
