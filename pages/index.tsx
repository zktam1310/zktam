import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function Medias(data: any) {
  const items = data.map((v: any, k: any) =>
    <div className={styles.youtube_embed}
      key={k}>
      <iframe src={`https://www.youtube.com/embed/${v.source_id}?autoplay=1&origin=${origin}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
    </div>
  );
  if (data.length > 0) {
    return items
  }
  return <span>None</span>
}

export default function Home() {

  const [origin, setOrigin] = useState("");
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    setOrigin(window.location.origin);
    let now: any = dayjs.utc().format();
    (async () => {
      // let addMedia = await fetch("/api/sheets", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     source_id: 'XrY2m5rdlQQ',
      //     source: 'youtube',
      //     timestamp: now
      //   }),
      // });
      const results = await fetch(`/api/streams?timestamp=${now}`).then(response => response.json());
      setSheets(results);
    })();

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
        {Medias(sheets)}
      </main>
    </div>
  )
}
