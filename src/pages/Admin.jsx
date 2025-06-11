import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert } from 'lucide-react';

const Admin = () => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    genre: '',
  });
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const adminPassword = '@ravisingh';

  useEffect(() => {
    if (isAdmin) fetchMovies();
  }, [isAdmin]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/movies');
      setMovies(res.data);
    } catch (err) {
      alert('Failed to fetch movies');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === adminPassword) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Wrong Password! You are not an admin!');
    }
  };

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/movies/${editId}`, movieData);
        alert('Movie updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/movies', movieData); // fixed endpoint
        alert('Movie created successfully!');
      }
      setMovieData({ title: '', description: '', imageUrl: '', genre: '' });
      setIsEditing(false);
      setEditId(null);
      fetchMovies();
    } catch (err) {
      alert('Error while saving the movie.');
    }
  };

  const handleEdit = (movie) => {
    setMovieData({
      title: movie.title,
      description: movie.description,
      imageUrl: movie.imageUrl,
      genre: movie.genre,
    });
    setIsEditing(true);
    setEditId(movie.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setMovieData({ title: '', description: '', imageUrl: '', genre: '' });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`http://localhost:8080/api/movies/${id}`);
        fetchMovies();
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  return (
    <div className='bg-gray-100'>
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-900 text-white shadow-xl rounded-xl border border-gray-700">
        <h2 className="text-red-400 text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-4 flex items-center justify-center gap-2">
          <ShieldAlert className="text-red-500" size={26} />
          Only Admin Can Access This Page
        </h2>

        {!isAdmin ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <label className="block text-gray-300 font-semibold">Enter Admin Password:</label>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Admin Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition"
            >
              Submit
            </button>
            {error && <p className="text-red-400 font-semibold">{error}</p>}
          </form>
        ) : (
          <>
            {/* Movie Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mb-10">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? 'Edit Movie' : 'Create New Movie'}
              </h3>
              {['title', 'description', 'imageUrl', 'genre'].map((field) => (
                <div key={field}>
                  <label className="block text-gray-300 font-medium capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={movieData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                  />
                </div>
              ))}
              <div className="flex justify-between gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  {isEditing ? 'Update Movie' : 'Create Movie'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Movie List */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-5 text-white">Movie List</h3>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-white">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.genre}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
