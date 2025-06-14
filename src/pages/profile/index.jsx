import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Token tidak ditemukan');
      return;
    }

    try {
      // Decode JWT token (split and decode base64)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Format token tidak valid');
      }
      
      const payload = JSON.parse(atob(tokenParts[1]));
      setTokenData(payload);
    } catch (err) {
      setError('Token tidak valid atau rusak');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString('id-ID');
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!tokenData) {
    return (
      <div className="container mx-auto p-4">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
        <Navbar />
      <div className="mt-32 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">Profile</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <p className="text-gray-900 break-all">{tokenData.id}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{tokenData.email}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="text-gray-900">{tokenData.role}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="block text-sm font-medium text-gray-700">Token Dibuat</label>
            <p className="text-gray-900">{formatTimestamp(tokenData.iat)}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="block text-sm font-medium text-gray-700">Token Kedaluwarsa</label>
            <p className="text-gray-900">{formatTimestamp(tokenData.exp)}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;