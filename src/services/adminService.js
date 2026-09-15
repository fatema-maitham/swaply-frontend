const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/admin`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const getDashboard = async () => {
  const response = await fetch(
    `${BASE_URL}/dashboard`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load dashboard'
    );
  }

  return data.statistics;
};

const getUsers = async () => {
  const response = await fetch(
    `${BASE_URL}/users`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load users'
    );
  }

  return data.users;
};

const getSkills = async () => {
  const response = await fetch(
    `${BASE_URL}/skills`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load skills'
    );
  }

  return data.skills;
};

const getSwaps = async () => {
  const response = await fetch(
    `${BASE_URL}/swaps`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load swaps'
    );
  }

  return data.swaps;
};

const getReviews = async () => {
  const response = await fetch(
    `${BASE_URL}/reviews`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load reviews'
    );
  }

  return data.reviews;
};

const getAuditLogs = async () => {
  const response = await fetch(
    `${BASE_URL}/audit-logs`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load audit logs'
    );
  }

  return data.auditLogs;
};

const toggleUserStatus = async (userId) => {
  const response = await fetch(
    `${BASE_URL}/users/${userId}/status`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to update user status'
    );
  }

  return data.user;
};

const deleteUser = async (userId) => {
  const response = await fetch(
    `${BASE_URL}/users/${userId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to delete user'
    );
  }

  return data;
};

const deleteSkill = async (skillId) => {
  const response = await fetch(
    `${BASE_URL}/skills/${skillId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to delete skill'
    );
  }

  return data;
};

const deleteReview = async (reviewId) => {
  const response = await fetch(
    `${BASE_URL}/reviews/${reviewId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to delete review'
    );
  }

  return data;
};

export {
  getDashboard,
  getUsers,
  getSkills,
  getSwaps,
  getReviews,
  getAuditLogs,
  toggleUserStatus,
  deleteUser,
  deleteSkill,
  deleteReview,
};

