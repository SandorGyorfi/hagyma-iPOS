import React, { useState } from 'react';

const PasswordProtected = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Környezeti változóból olvassuk a jelszót
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Helytelen jelszó!');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-csarda-feher-tort flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bree text-csarda-barna-sotet mb-6 text-center">
          Bevétel kimutatás
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-bree text-csarda-barna-kozep mb-2"
            >
              Kérem adja meg a jelszót:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-csarda-barna-vilagos rounded-lg focus:outline-none focus:ring-2 focus:ring-csarda-barna-sotet"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-csarda-piros-mely text-sm font-bree">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-csarda-barna-sotet text-white py-2 px-4 rounded-lg font-bree hover:bg-csarda-barna-kozep transition-colors"
          >
            Belépés
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="w-full bg-csarda-feher-tort text-csarda-barna-sotet py-2 px-4 rounded-lg font-bree hover:bg-csarda-feher-alap transition-colors mt-2"
          >
            Vissza a főoldalra
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtected; 