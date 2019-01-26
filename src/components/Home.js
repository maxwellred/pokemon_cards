import React from 'react';
import List from './List.js';
export default function Dashboard() {
  return (
    <main id="home">
      <h1>Welcome! Choose which Pokemon Card you want to see from the list below.</h1>
      <List />
    </main>
  );
}
