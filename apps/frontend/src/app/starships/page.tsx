import React from 'react';
import { getStarships } from '@/services/ApiClient';

const StarshipsPage: React.FC =  async () => {
  const starships = await getStarships();
  return (
    <div>
      <h1>All starships</h1>
      <pre>{JSON.stringify(starships, null, 2)}</pre>
    </div>
  );
}

export default StarshipsPage;