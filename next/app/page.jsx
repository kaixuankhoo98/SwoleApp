'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(localStorage?.getItem('sessionToken') ? 'Logged In' : 'Logged Out');
  }, [])

  return (
    <div suppressHydrationWarning={true}>
      HOME PAGE
      <p>
        {status}
      </p>
    </div>
  )
}
