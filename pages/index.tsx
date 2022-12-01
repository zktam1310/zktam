import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>cliché? touché!</title>
        <meta name="description" content="Cliché? Touché!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        It{"'s"} a myth that soundcloud{"'s"} API is so much better than youtube
      </main>

    </div>
  )
}
