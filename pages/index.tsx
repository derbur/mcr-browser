import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const res = await fetch('https://mcr.microsoft.com/v2/_catalog');
  const data = await res.json();
  return {
    props: {
      repositories: data.repositories
    }
  }
}

export default function Home({ repositories }: { repositories: string[] }) {
  const [query, setQuery] = useState('');
  return (
    <div className={styles.container}>
      <Head>
        <title>MCR Browser</title>
        <meta name="description" content="A browser for microsoft container registry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col justify-center items-center'>
        <h1 className="text-6xl font-bold">
          MCR Browser
        </h1>

        <form>
          <input
            type="text"
            placeholder='Search repositories...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='h-10 w-64 m-4 placeholder:italic p-2 border border-slate-300 rounded-md focus:shadow-lg transition ease-in-out'></input>
        </form>
        <div className='flex flex-col'>
          {repositories.filter(r => {
            if(query) {
              return r.includes(query);
            } else {
              return true;
            }
          }).map((r) => {
            return <div key={r} className='flex h-14 w-128 p-2 m-2 rounded-lg border border-slate-300'>
              <div className='m-auto text-slate-600'>{r}</div>
            </div>
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
