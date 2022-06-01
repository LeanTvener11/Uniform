import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { CanvasClient } from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import resolveRenderer from "../lib/resolveSolver"

//git repo unistore for examples, on github on 

export async function getStaticProps() {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition } = await client.getCompositionBySlug({
    slug: "/",
  });
  return {
    props: {
      composition,
    },
  };
}

export default function Home({composition}) {
  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
      <div className={styles.container}>
        <Head>
          <title>{composition.parameters.title.value}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        
        <main className={styles.main}>
          <Slot name="header" />

          <Slot name="body" />
        </main>
      </div>
    </Composition>
  )
}


