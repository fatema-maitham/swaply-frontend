const getCommunityUsers = async () => {
  try {
    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    const response = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.err || 'Failed to load community members.'
      );
    }

    return data.users;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export {
  getCommunityUsers,
};
