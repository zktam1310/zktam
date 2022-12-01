import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>cliché? touché!</title>
        <meta name="description" content="cliché? touché!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Moving on...
      </main>

    </div>
  )
}
