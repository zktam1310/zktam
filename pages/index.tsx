import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  let current_year: any = new Date()
  current_year = current_year.getFullYear()
  return (
    <div className={styles.container}>
      <Head>
        <title>Cliché? Touché!</title>
        <meta name="description" content="Cliché? Touché!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
        {current_year} 	&#169; the streets, alleys, corners of the bars
      </footer>
    </div>
  )
}
