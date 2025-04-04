'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '../component/ProgressBar';


export default function Page3() {
  const [pageConfig, setPageConfig] = useState({ page3: [] });
  const [formData, setFormData] = useState({
    birthdate: '',
    aboutMe: '',
    address: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const configData = localStorage.getItem('pageConfig');
      if (configData) setPageConfig(JSON.parse(configData));

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser?.page3) {
        setFormData(prev => ({ ...prev, ...currentUser.page3 }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load saved data');
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      const updatedUser = {
        ...currentUser,
        page3: { ...formData }
      };

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      const allUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = allUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setSuccess(true);
      router.push('/thanks')
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = (component) => {
    switch (component) {
      case 'Birthdate':
        return (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
            <input
              type="date"
              value={formData.birthdate}
              onChange={(e) => handleInputChange('birthdate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
        );
      case 'About Me':
        return (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
            <textarea
              value={formData.aboutMe}
              onChange={(e) => handleInputChange('aboutMe', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              rows={3}
              placeholder="Tell us about yourself..."
              required
            />
          </div>
        );
      case 'Address':
        return (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your full address"
              required
            />
          </div>
        );
      case 'Phone Number':
        return (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your phone number"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10" style={{ width: '100px', height: '100px', marginLeft:'72px' }}>
            <ProgressBar currentStep={3} />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Additional Information</h1>
          <p className="mt-2 text-sm text-gray-600">Please provide your details</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          {pageConfig.page3.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No information requested</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {pageConfig.page3.map((component) => (
                <div key={component} className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">{component}</h3>
                  {renderComponent(component)}
                </div>
              ))}
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Done'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}