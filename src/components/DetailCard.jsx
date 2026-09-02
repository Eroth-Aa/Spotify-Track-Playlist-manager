import React, { useState, useEffect } from 'react';

export default function DetailCard({ selectedTrack }) {
  const [activeDetails, setActiveDetails] = useState(null);
  useEffect(() => {
    setActiveDetails(selectedTrack);
  }, [selectedTrack]);

  if (!activeDetails) {
    return (
      <div className="bg-slate-800 text-slate-400 p-6 rounded-xl border border-slate-700 text-center">
        Select a row from the registry table to view full details.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-green-400">{activeDetails.title}</h3>
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
          activeDetails.userRole === 'Creator' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          {activeDetails.userRole}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 pt-2">
        <p><strong className="text-white">Artist:</strong> {activeDetails.artist}</p>
        <p><strong className="text-white">Genre:</strong> {activeDetails.genre}</p>
        <p><strong className="text-white">Rating / BPM:</strong> {activeDetails.ratingBpm}/100</p>
        <p><strong className="text-white">Record Label:</strong> {activeDetails.recordLabel}</p>
      </div>
    </div>
  );
}