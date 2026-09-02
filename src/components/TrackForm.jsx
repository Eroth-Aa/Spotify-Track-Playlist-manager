import React, { useState } from 'react';

const GENRES = ['Pop', 'Rock', 'Indie', 'Jazz'];

export default function TrackForm({ onAddTrack }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Pop',
    artist: '',
    ratingBpm: '',
    recordLabel: '',
    userRole: 'Creator'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.title.trim() || formData.title.trim().length < 3) {
      errs.title = 'Track title must be at least 3 characters.';
    }
    if (!formData.artist.trim()) {
      errs.artist = 'Artist name is required.';
    }
    const bpm = Number(formData.ratingBpm);
    if (!formData.ratingBpm || isNaN(bpm) || bpm < 1 || bpm > 100) {
      errs.ratingBpm = 'Rating/BPM must be a number between 1 and 100.';
    }
    if (!formData.recordLabel.trim()) {
      errs.recordLabel = 'Record Label is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddTrack({ ...formData, id: Date.now(), ratingBpm: Number(formData.ratingBpm) });
      setFormData({ title: '', genre: 'Pop', artist: '', ratingBpm: '', recordLabel: '', userRole: 'Creator' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 text-white p-6 rounded-xl shadow-lg space-y-4 border border-slate-700">
      <h2 className="text-xl font-bold text-green-400">Add New Spotify Track</h2>
      
      <div>
        <label className="block text-sm font-medium">Track Title</label>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full mt-1 p-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-none focus:border-green-500"
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Artist Name</label>
          <input 
            type="text" 
            value={formData.artist} 
            onChange={(e) => setFormData({...formData, artist: e.target.value})}
            className="w-full mt-1 p-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-none focus:border-green-500"
          />
          {errors.artist && <p className="text-red-400 text-xs mt-1">{errors.artist}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Genre</label>
          <select 
            value={formData.genre} 
            onChange={(e) => setFormData({...formData, genre: e.target.value})}
            className="w-full mt-1 p-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-none focus:border-green-500"
          >
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Rating / BPM (1-100)</label>
          <input 
            type="number" 
            value={formData.ratingBpm} 
            onChange={(e) => setFormData({...formData, ratingBpm: e.target.value})}
            className="w-full mt-1 p-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-none focus:border-green-500"
          />
          {errors.ratingBpm && <p className="text-red-400 text-xs mt-1">{errors.ratingBpm}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Record Label</label>
          <input 
            type="text" 
            value={formData.recordLabel} 
            onChange={(e) => setFormData({...formData, recordLabel: e.target.value})}
            className="w-full mt-1 p-2 bg-slate-900 rounded border border-slate-700 text-white focus:outline-none focus:border-green-500"
          />
          {errors.recordLabel && <p className="text-red-400 text-xs mt-1">{errors.recordLabel}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">User Role</label>
        <div className="flex space-x-6">
          {['Creator', 'Listener'].map(role => (
            <label key={role} className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="userRole" 
                value={role} 
                checked={formData.userRole === role}
                onChange={(e) => setFormData({...formData, userRole: e.target.value})}
                className="accent-green-500"
              />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded transition">
        Submit Track
      </button>
    </form>
  );
}