
import Head from "next/head";
import {TermsOfUse} from "@/components/pages/TermsOfUse";

export default function Terms (){
    return(
        <>
            <Head>
                <title>Terms of use</title>
            </Head>
            <TermsOfUse/>
        </>
    )
}