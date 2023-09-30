'use client'
import { edenTreaty } from '@elysiajs/eden';
import type { App } from "@/../../backend/src/index";

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';

const api = edenTreaty<App>('http://localhost:3050');

export default function Home() {
  const [name, setName] = useState("");
  const [greet, setGreet] = useState("");

  function sendApi() {
    api.hello.post({
      name: name
    }).then(response => {
      if (response.error) {
        setGreet("發生錯誤😭");
      } else {
        setGreet(response.data);
      }
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <div>
        <input
          type='text'
          value={name}
          onChange={event => { setName(event.target.value); }}
        />
        <button onClick={sendApi}>讓伺服器跟你打招呼!</button>
        <div>{greet}</div>
      </div>
    </main>
  )
}
