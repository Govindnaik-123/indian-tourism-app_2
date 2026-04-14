'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const StateNetworkGraph = dynamic(() => import('./StateNetworkGraph'), { 
  ssr: false,
  loading: () => <div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-[3rem]" />
});

interface Props {
  states: {
    name: string;
    count: number;
    image: string;
  }[];
}

export const StateNetworkWrapper: React.FC<Props> = ({ states }) => {
  return <StateNetworkGraph states={states} />;
};
