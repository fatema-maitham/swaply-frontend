const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`;

const getToken = () => {
  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token')
  );
};

const getReviews = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const res = await fetch(BASE_URL, config);
  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.reviews;
};

const getReview = async (reviewId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const res = await fetch(
    `${BASE_URL}/${reviewId}`,
    config
  );

  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.review;
};

const createReview = async (formData) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      swap: formData.swap,
      rating: Number(formData.rating),
      comment: formData.comment,
    }),
  };

  const res = await fetch(BASE_URL, config);
  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.review;
};

const updateReview = async (reviewId, formData) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      rating: Number(formData.rating),
      comment: formData.comment,
    }),
  };

  const res = await fetch(
    `${BASE_URL}/${reviewId}`,
    config
  );

  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data.review;
};

const deleteReview = async (reviewId) => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const res = await fetch(
    `${BASE_URL}/${reviewId}`,
    config
  );

  const data = await res.json();

  if (data.err) {
    throw new Error(data.err);
  }

  return data;
};

export {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};