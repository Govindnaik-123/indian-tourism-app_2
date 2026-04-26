'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/users', {
        headers: {
          'x-admin-password': password,
        },
      });

      if (!res.ok) {
        throw new Error('Incorrect password');
      }

      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Secret Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter password..."
                required
              />
            </div>
            
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-white">Registered Users</h1>
            <p className="text-gray-400 mt-1">Live data from MongoDB</p>
          </div>
          <div className="mt-4 md:mt-0 bg-orange-500/20 px-6 py-3 rounded-xl border border-orange-500/30">
            <p className="text-sm text-orange-200">Total Users</p>
            <p className="text-3xl font-bold text-orange-400">{total}</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-black/40 text-gray-200 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4 text-orange-200">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
