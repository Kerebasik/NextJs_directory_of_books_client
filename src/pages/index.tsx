import Head from 'next/head'
import HomePage from '@/components/pages/HomePage'

function Home() {
  return (
      <>
        <Head>
            <title>Home</title>
        </Head>
        <HomePage/>
      </>
    )
}

export default Home