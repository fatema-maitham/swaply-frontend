const BASE_URL =
  `${import.meta.env.VITE_BACK_END_SERVER_URL}/admin`;

const CATEGORIES_URL =
  `${import.meta.env.VITE_BACK_END_SERVER_URL}/categories`;

const getAuthHeaders = () => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ========================================
// DASHBOARD
// ========================================

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

// ========================================
// USERS
// ========================================

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

// ========================================
// SKILLS
// ========================================

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

// ========================================
// SWAPS
// ========================================

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

// ========================================
// REVIEWS
// ========================================

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

// ========================================
// AUDIT LOGS
// ========================================

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

// ========================================
// CATEGORIES
// ========================================

const getCategories = async () => {
  const response = await fetch(
    `${CATEGORIES_URL}`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to load categories'
    );
  }

  return data.categories;
};

const createCategory = async (name) => {
  const response = await fetch(
    `${CATEGORIES_URL}`,
    {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to create category'
    );
  }

  return data.category;
};

const updateCategory = async (categoryId, name) => {
  const response = await fetch(
    `${CATEGORIES_URL}/${categoryId}`,
    {
      method: 'PATCH',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to update category'
    );
  }

  return data.category;
};

const deleteCategory = async (categoryId) => {
  const response = await fetch(
    `${CATEGORIES_URL}/${categoryId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.err || 'Failed to delete category'
    );
  }

  return data;
};

// ========================================
// USER STATUS
// ========================================

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

// ========================================
// DELETE USER
// ========================================

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

// ========================================
// DELETE SKILL
// ========================================

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

// ========================================
// DELETE REVIEW
// ========================================

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
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleUserStatus,
  deleteUser,
  deleteSkill,
  deleteReview,
};