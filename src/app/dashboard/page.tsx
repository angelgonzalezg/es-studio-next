'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser'; // Assuming this provides user with roles

interface ClientProfile {
  companyName: string;
  taxId: string;
  billingAddress: string;
}

interface DesignerProfile {
  specialty: string;
  bio: string;
  portfolioUrl: string;
}

interface BaseUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roles: string[];
  updateTime?: string | null;
}

interface FullUser extends BaseUser {
  clientProfile?: ClientProfile;
  designerProfile?: DesignerProfile;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  selectedRole: string;
  clientProfile: ClientProfile;
  designerProfile: DesignerProfile;
}

type User = BaseUser; // For list

const API_BASE = '/api';

export default function Dashboard() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<FullUser | null>(null);
  const [showModal, setShowModal] = useState(false);
const [isCreate, setIsCreate] = useState(false);
const [formData, setFormData] = useState<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  selectedRole: '',
  clientProfile: { companyName: '', taxId: '', billingAddress: '' },
  designerProfile: { specialty: '', bio: '', portfolioUrl: '' },
});

  const getToken = () => {
    const authStateStr = localStorage.getItem('auth_state');
    if (!authStateStr) return null;
    try {
      return JSON.parse(authStateStr).token;
    } catch (err) {
      console.error('Invalid auth state', err);
      return null;
    }
  };

  useEffect(() => {
    if (user?.roles?.includes('ROLE_ADMIN')) {
      setIsAdmin(true);
      fetchUsers();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${API_BASE}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers((Array.isArray(data) ? data : []).sort((a, b) => a.id - b.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (user: User) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE}/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user details');
      const fullUser: FullUser = await response.json();

      setEditingUser(fullUser);
      setFormData({
        firstName: fullUser.firstName,
        lastName: fullUser.lastName,
        email: fullUser.email,
        phone: fullUser.phone || '',
        password: '',
        selectedRole: fullUser.roles[0]?.replace('ROLE_', '') || '',
        clientProfile: fullUser.clientProfile || { companyName: '', taxId: '', billingAddress: '' },
        designerProfile: fullUser.designerProfile || { specialty: '', bio: '', portfolioUrl: '' },
      } as FormData);
      setIsCreate(false);
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = getToken();
      console.log(token);
    const response = await fetch(`${API_BASE}/users/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    console.log(response);
    if (!response.ok) throw new Error('Failed to delete user');
      fetchUsers(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleCreate = () => {
    setIsCreate(true);
    setEditingUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      selectedRole: '',
      clientProfile: { companyName: '', taxId: '', billingAddress: '' },
      designerProfile: { specialty: '', bio: '', portfolioUrl: '' },
    } as FormData);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreate) {
      if (!formData.email || !formData.password || formData.firstName.trim() === '' || formData.lastName.trim() === '' || !formData.selectedRole) {
        setError('Please fill all required fields.');
        return;
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
        roles: [formData.selectedRole],
      };

      try {
        const token = getToken();
        const response = await fetch(`${API_BASE}/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to create user');
        }
        setShowModal(false);
        setIsCreate(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          selectedRole: '',
          clientProfile: { companyName: '', taxId: '', billingAddress: '' },
          designerProfile: { specialty: '', bio: '', portfolioUrl: '' },
        } as FormData);
        fetchUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
      return;
    }

    if (!editingUser) return;

    const userPayload: Partial<FullUser> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || undefined,
    };

    // Add profile based on selected role
    if (formData.selectedRole === 'ROLE_USER') {
      userPayload.clientProfile = formData.clientProfile;
    }
    if (formData.selectedRole === 'ROLE_DESIGNER' || formData.selectedRole === 'ROLE_ADMIN') {
      userPayload.designerProfile = formData.designerProfile;
    }

    try {
      const token = getToken();

      // Update user details (excluding role)
      const userResponse = await fetch(`${API_BASE}/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userPayload),
      });
      if (!userResponse.ok) throw new Error('Failed to update user details');

      // Update role separately if selected
      if (formData.selectedRole) {
        const roleResponse = await fetch(`${API_BASE}/users/${editingUser.id}/role`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ role: formData.selectedRole }),
        });
        if (!roleResponse.ok) throw new Error('Failed to update role');
      }

      setShowModal(false);
      setEditingUser(null);
      fetchUsers(); // Refresh
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRole: prev.selectedRole === role ? '' : role,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <div>Access Denied: Admin role required</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New User
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Roles</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.roles.map(r => r.replace('ROLE_', '')).join(', ')}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={async () => await handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (isCreate || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isCreate ? 'Create User' : 'Edit User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email {isCreate ? '' : '(read-only)'}</label>
                {isCreate ? (
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                ) : (
                  <input
                    type="email"
                    value={formData.email || ''}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              {isCreate && (
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">{isCreate ? 'Role (select one)' : 'Role'}</label>
                <div className="flex flex-col space-y-2">
                  {isCreate ? (
                    ['USER', 'DESIGNER', 'ADMIN'].map(role => (
                      <label key={role} className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.selectedRole === role}
                          onChange={() => handleRoleSelect(role)}
                          className="mr-2"
                        />
                        {role}
                      </label>
                    ))
                  ) : (
                    ['ROLE_USER', 'ROLE_DESIGNER', 'ROLE_ADMIN'].map(role => (
                      <label key={role} className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.selectedRole === role}
                          onChange={() => handleRoleSelect(role)}
                          className="mr-2"
                        />
                        {role.replace('ROLE_', '')}
                      </label>
                    ))
                  )}
                </div>
              </div>

              {!isCreate && formData.selectedRole === 'ROLE_USER' && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Client Profile</h3>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Company Name</label>
                    <input
                      type="text"
                      value={formData.clientProfile.companyName || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        clientProfile: { ...formData.clientProfile, companyName: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Tax ID</label>
                    <input
                      type="text"
                      value={formData.clientProfile.taxId || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        clientProfile: { ...formData.clientProfile, taxId: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Billing Address</label>
                    <textarea
                      value={formData.clientProfile.billingAddress || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        clientProfile: { ...formData.clientProfile, billingAddress: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}

              {!isCreate && (formData.selectedRole === 'ROLE_DESIGNER' || formData.selectedRole === 'ROLE_ADMIN') && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Designer Profile</h3>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Specialty</label>
                    <input
                      type="text"
                      value={formData.designerProfile.specialty || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        designerProfile: { ...formData.designerProfile, specialty: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Bio</label>
                    <textarea
                      value={formData.designerProfile.bio || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        designerProfile: { ...formData.designerProfile, bio: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-bold mb-1">Portfolio URL</label>
                    <input
                      type="url"
                      value={formData.designerProfile.portfolioUrl || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        designerProfile: { ...formData.designerProfile, portfolioUrl: e.target.value }
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}