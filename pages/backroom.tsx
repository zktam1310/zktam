import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from '../styles/Backroom.module.css';

dayjs.extend(utc);
dayjs.extend(relativeTime);

async function removeStream(id: any) {
  await fetch("/api/streams", {
    method: "POST",
    body: JSON.stringify({
      _id: id,
      method: 'delete'
    }),
  });
}

async function submitNewStream(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.code != "Enter") return;

  const streamBaseUrls = [
    "https://youtu.be/",
    "https://www.youtube.com/watch?v="
  ];

  const target = e.target as HTMLTextAreaElement;

  if (!streamBaseUrls.some((url) => target.value.includes(url))) return;

  const current_base_url = (streamBaseUrls.filter((url) => target.value.includes(url)))[0];

  let video_id = (target.value.split(current_base_url))[1];
  let now: any = dayjs.utc().format();
  await fetch("/api/streams", {
    method: "POST",
    body: JSON.stringify({
      source_id: video_id,
      source: 'youtube',
      timestamp: now,
      method: 'add'
    })
  });
}

function Medias(data: any) {
  const items = data.map((v: any, k: any) =>
    <div className={styles.youtube_embed}
      key={k}>
        🎧 {v["source_id"]} [{dayjs(v["timestamp"]).fromNow()}]
        <button onClick={async () => removeStream(v["_id"])}>
          🗑️
        </button>
    </div>
  );
  if (data.length > 0) {
    return items
  }
  return <span>None</span>
}

export default function Home() {

  const [streams, setStreams] = useState([]);
  const [showStreamInput, setShowStreamInput] = useState(false);
  const [showWordInput, setShowWordInput] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const initialRun = useRef(true)

  useEffect(() => {
    if (initialRun.current) {
        (async () => {
          const results = await fetch(`/api/streams`).then(response => response.json());
          setStreams(results);
          setLoaded(true);
        })();
        initialRun.current = false;
    }
  }, []);


  function renderNewField() {
    if (showStreamInput) {
      return (
        <div className='w-full mb-10'>
          <input
            className={styles.input}
            placeholder='shareable url'
            onKeyPress={(e) => submitNewStream(e)}></input>
        </div>
      )
    }
  }

  return (
    <div className="max-width-container">
      <Head>
        <title>Are you a devil in the workshop too?</title>
      </Head>
      <main className={styles.main}>
        <div>
          <button
            className={styles.btn}
            onClick={() => setShowStreamInput(!showStreamInput)}>
            New Stream
          </button>
          {/* <button
            className={styles.btn}
            onClick={() => setShowStreamInput(!setShowStreamInput)}>
            New Words
          </button> */}
          {renderNewField()}
        </div>
        {
          loaded ?
          Medias(streams) :
          <div>spinning..</div>
        }
      </main>
    </div>
  )
}
