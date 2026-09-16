const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
};

const getProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.user;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getUsers = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.users;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const updateProfile = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data.user;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export {
  getProfile,
  getUsers,
  updateProfile,
  deleteProfile,
};