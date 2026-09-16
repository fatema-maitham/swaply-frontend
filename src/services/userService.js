const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getToken = () => {
  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token')
  );
};

const getAuthHeaders = () => {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ========================================
// GET MY PROFILE
// ========================================

const getProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.err || 'Failed to load profile.'
      );
    }

    return data.user;
  } catch (err) {
    console.log('GET PROFILE ERROR:', err);
    throw new Error(err.message);
  }
};

// ========================================
// GET COMMUNITY USERS
// ========================================

const getUsers = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.err || 'Failed to load users.'
      );
    }

    return data.users;
  } catch (err) {
    console.log('GET USERS ERROR:', err);
    throw new Error(err.message);
  }
};

// ========================================
// UPDATE MY PROFILE
// ========================================

const updateProfile = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.err || 'Failed to update profile.'
      );
    }

    return data.user;
  } catch (err) {
    console.log('UPDATE PROFILE ERROR:', err);
    throw new Error(err.message);
  }
};

// ========================================
// DELETE MY PROFILE
// ========================================

const deleteProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.err || 'Failed to delete profile.'
      );
    }

    return data;
  } catch (err) {
    console.log('DELETE PROFILE ERROR:', err);
    throw new Error(err.message);
  }
};

export {
  getProfile,
  getUsers,
  updateProfile,
  deleteProfile,
};