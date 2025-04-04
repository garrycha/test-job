'use client';

import { useEffect, useState } from "react";

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pageConfig, setPageConfig] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      if (parsedUsers.length > 0) {
        setSelectedUserId(parsedUsers[0].id);
      }
    }
    const savedConfig = localStorage.getItem("pageConfig");
    if (savedConfig) {
      setPageConfig(JSON.parse(savedConfig));
    }
  }, []);

  if (!users.length || !pageConfig) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-700">Loading data...</p>
        </div>
      </div>
    );
  }

  const allFields = [
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password', mask: true },
    { key: 'birthdate', label: 'Birthdate' },
    { key: 'aboutMe', label: 'About Me' },
    { key: 'address', label: 'Address' },
    { key: 'phoneNumber', label: 'Phone Number' }
  ];

  const selectedUser = users.find(user => user.id === selectedUserId) || {};

  const pagesWithData = [
    { name: 'Main', data: selectedUser },
    ...(selectedUser?.page2 ? [{ name: 'Page 2', data: selectedUser.page2 }] : []),
    ...(selectedUser?.page3 ? [{ name: 'Page 3', data: selectedUser.page3 }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Data</h1>
      
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className={user.id === selectedUserId ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          const updatedUsers = users.filter(u => u.id !== user.id);
                          localStorage.setItem('users', JSON.stringify(updatedUsers));
                          setUsers(updatedUsers);
                          if (user.id === selectedUserId && updatedUsers.length > 0) {
                            setSelectedUserId(updatedUsers[0].id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Field
                  </th>
                  {pagesWithData.map((page) => (
                    <th key={page.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {page.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allFields.map(({ key, label, mask }) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {label}
                    </td>
                    {pagesWithData.map((page) => (
                      <td key={`${page.name}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {page.data[key] ? 
                          (mask ? '••••••' : page.data[key]) : 
                          '-'}
                      </td>
                    ))}
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