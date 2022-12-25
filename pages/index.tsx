import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);

function Words(data: any) {
  return <div>life life life</div>
}

function Medias(data: any) {
  const items = data.map((v: any, k: any) =>
    <div className={styles.youtube_embed}
      key={k}>
      <div className='text-right'>{dayjs(v["timestamp"]).fromNow()}</div>
      <div>
        <iframe src={`https://www.youtube.com/embed/${v.source_id}?autoplay=1&origin=${origin}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
      </div>
    </div>
  );
  if (data.length > 0) {
    return items
  }
  return <div className="text-center italic">Out of music today, deal with it.</div>
}

export default function Home() {

  const [origin, setOrigin] = useState("");
  const [sheets, setSheets] = useState([]);
  const initialRun = useRef(true)

  useEffect(() => {
    if (initialRun.current) {
      setOrigin(window.location.origin);
      let now: any = dayjs.utc().format();
      (async () => {
        const results = await fetch(`/api/streams?timestamp=${now}`).then(response => response.json());
        setSheets(results);
      })();
      initialRun.current = false;
    }
  }, []);



  return (
    <div className="max-width-container">
      <main className={styles.main}>
        {/* {Words()} */}
        {Medias(sheets)}
      </main>
    </div>
  )
}
