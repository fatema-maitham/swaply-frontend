const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/skills`;

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
};

const getSkills = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || 'Failed to load skills.');
    }

    return data.skills;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getSkill = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || 'Failed to load skill.');
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const createSkill = async (skillData, image) => {
  try {
    const formData = new FormData();

    formData.append('name', skillData.name);
    formData.append('category', skillData.category);
    formData.append('description', skillData.description);

    if (image) {
      formData.append('skillImage', image);
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || 'Failed to create skill.');
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const updateSkill = async (id, skillData, image) => {
  try {
    const formData = new FormData();

    formData.append('name', skillData.name);
    formData.append('category', skillData.category);
    formData.append('description', skillData.description);

    if (image) {
      formData.append('skillImage', image);
    }

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || 'Failed to update skill.');
    }

    return data.skill;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteSkill = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || 'Failed to delete skill.');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};