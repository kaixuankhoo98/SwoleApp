'use client';

import Main from "@/components/Main";
import { useState, useEffect } from "react";

export default function Home() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(localStorage?.getItem('sessionToken') ? 'Logged In' : 'Logged Out');
  }, [])

  return (
    <Main>
      <div suppressHydrationWarning={true}>
        HOME PAGE
        <p>
          {status}
        </p>
      </div>
    </Main>
  )
}
