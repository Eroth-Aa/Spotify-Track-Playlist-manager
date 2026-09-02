import React, { useState } from 'react';
import TrackForm from './components/TrackForm';
import TrackTable from './components/TrackTable';
import DetailCard from './components/DetailCard';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [genreFilter, setGenreFilter] = useState('All');

  const handleAddTrack = (newTrack) => {
    setTracks(prev => [newTrack, ...prev]);
  };

  const filteredTracks = genreFilter === 'All' 
    ? tracks 
    : tracks.filter(t => t.genre === genreFilter);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-green-500">Spotify Track Playlist Manager</h1>
        <p className="text-slate-400 text-sm">Set A Midterm Practical Exam</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <TrackForm onAddTrack={handleAddTrack} />
        </div>

        <div className="lg:col-span-2 space-y-6">

          <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
            <span className="text-sm font-medium">Filter Registry by Genre:</span>
            <select 
              value={genreFilter} 
              onChange={(e) => setGenreFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-sm text-white focus:outline-none"
            >
              <option value="All">All Genres</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Indie">Indie</option>
              <option value="Jazz">Jazz</option>
            </select>
          </div>

          <TrackTable 
            tracks={filteredTracks} 
            onSelectTrack={setSelectedTrack}
            selectedTrackId={selectedTrack?.id}
          />

          <DetailCard selectedTrack={selectedTrack} />
        </div>
      </main>
    </div>
  );
}