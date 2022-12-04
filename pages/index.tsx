import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin)
  }, []);

  return (
    <div className="max-width-container">
      <Head>
        <title>cliché? touché!</title>
        <meta name="description" content="Cliché? Touché!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span style={{ fontStyle: "italic" }}>life life life</span>
        <div className={styles.youtube_embed}>
          <iframe src={`https://www.youtube.com/embed/NwVtIPeYIeQ?autoplay=1&origin=${origin}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
        </div>
      </main>
    </div>
  )
}
