const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/swaps`;

const getToken = () => {
  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token')
  );
};

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};

const getSwaps = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok || data.err) {
    throw new Error(
      data.err || 'Failed to load swaps.'
    );
  }

  return data.swaps;
};

const getSwap = async (swapId) => {
  const res = await fetch(
    `${BASE_URL}/${swapId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await res.json();

  if (!res.ok || data.err) {
    throw new Error(
      data.err || 'Failed to load swap.'
    );
  }

  return data.swap;
};

const createSwap = async (formData) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(BASE_URL, config);
  const data = await res.json();

  if (!res.ok || data.err) {
    throw new Error(
      data.err || 'Failed to create swap.'
    );
  }

  return data.swap;
};

const updateSwap = async (swapId, formData) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(
    `${BASE_URL}/${swapId}`,
    config
  );

  const data = await res.json();

  if (!res.ok || data.err) {
    throw new Error(
      data.err || 'Failed to update swap.'
    );
  }

  return data.swap;
};

const deleteSwap = async (swapId) => {
  const res = await fetch(
    `${BASE_URL}/${swapId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  const data = await res.json();

  if (!res.ok || data.err) {
    throw new Error(
      data.err || 'Failed to delete swap.'
    );
  }

  return data;
};

export {
  getSwaps,
  getSwap,
  createSwap,
  updateSwap,
  deleteSwap,
};