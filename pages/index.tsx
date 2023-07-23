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
        <iframe src={`https://www.youtube.com/embed/${v.source_id}?origin=${origin}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
      </div>
    </div>
  );
  if (data.length > 0) {
    return items
  }
  return (
    <>
      <div className="text-center yujiBoku">It&apos;s a new day</div>
      <div className="text-center not-italic yujiBoku">Start the conversation?</div>
    </>
  )
}

export default function Home() {

  const [origin, setOrigin] = useState("");
  const [streams, setStreams] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const initialRun = useRef(true)

  useEffect(() => {
    if (initialRun.current) {
      setOrigin(window.location.origin);
      let now: any = dayjs.utc().format();
      (async () => {
        const results = await fetch(`/api/streams?timestamp=${now}`).then(response => response.json());
        setStreams(results);
        setLoaded(true);
      })();
      initialRun.current = false;
    }
  }, []);



  return (
    <div className="max-width-container">
      <main className={styles.main}>
        {/* {Words()} */}
        {
          loaded ?
          Medias(streams) :
          <div>
            <img src="/ying-running.gif" width={'80px'} />
          </div>
        }
      </main>
    </div>
  )
}
