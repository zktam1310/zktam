import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function ServerError() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cliché? Touché!</title>
        <meta name="description" content="Cliché? Touché!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}
