import React, { useRef, useEffect, useState } from "react"
import Head from 'next/head';


function Footer() {
  const [currentYear, setCurrentyear] = useState("") as any;
  const [footer, setFooter] = useState("");
  const initialRun = useRef(true);

  const footers = [
    "the streets, alleys, corners of the bars",
    "the front gardens, art parlours, flowers by the highway",
    "the open smoking area"
  ];

  useEffect(() => {
    if (initialRun.current) {
        (async () => {
          const current_year = (new Date()).getFullYear();
          setCurrentyear(current_year);
          setFooter(footers[Math.floor(Math.random() * footers.length)])
        })();
        initialRun.current = false;
    }
  }, []);

  return (
    <footer className="footer">
      {currentYear} &#169; {footer}
    </footer>
  )
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>I hope you{"'"}ve already had your cup of coffee or tea today.</title>
        <meta name="description" content="offbéat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">{children}</main>
      {Footer()}
    </>
  )
}
