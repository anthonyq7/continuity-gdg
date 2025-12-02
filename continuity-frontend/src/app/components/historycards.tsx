'use client';
import React from 'react';
interface historyProps {
    title: string;
    time: string;
}

export function historyProps({ title, time }: historyProps) {
  return (
    <div className="mt-4 space-y-3">
        <div className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors">
            <p className="text-gray-900 font-semibold">{title}</p>
            <p className="text-gray-600 text-sm mt-1">{time}</p>
        </div>
    </div>  
    );
}