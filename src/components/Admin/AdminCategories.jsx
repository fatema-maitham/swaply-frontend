import { useEffect, useState } from 'react';

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../../services/adminService';

import AdminAside from './AdminAside';

import './Admin.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState('');

  const [editingId, setEditingId] = useState(null);

  const [editingName, setEditingName] = useState('');

  const [message, setMessage] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      setMessage('Please enter a category name.');
      return;
    }

    try {
      setIsSaving(true);
      setMessage('');

      const newCategory = await createCategory(
        categoryName.trim()
      );

      setCategories((currentCategories) => [
        ...currentCategories,
        newCategory,
      ].sort((a, b) =>
        a.name.localeCompare(b.name)
      ));

      setCategoryName('');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = (category) => {
    setEditingId(category._id);

    setEditingName(category.name);

    setMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setEditingName('');
  };

  const handleUpdateCategory = async (categoryId) => {
    if (!editingName.trim()) {
      setMessage('Please enter a category name.');
      return;
    }

    try {
      setIsSaving(true);
      setMessage('');

      const updatedCategory = await updateCategory(
        categoryId,
        editingName.trim()
      );

      setCategories((currentCategories) =>
        currentCategories
          .map((category) =>
            category._id === categoryId
              ? updatedCategory
              : category
          )
          .sort((a, b) =>
            a.name.localeCompare(b.name)
          )
      );

      handleCancelEdit();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      setDeletingId(categoryId);
      setMessage('');

      await deleteCategory(categoryId);

      setCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category._id !== categoryId
        )
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-page">
      <AdminAside />

      <section className="admin-content">
        <header className="admin-header">
          <p className="admin-header-label">
            ADMINISTRATION
          </p>

          <h1>Categories</h1>

          <p>
            Manage the categories available for Swaply skills.
          </p>
        </header>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        <form
          className="admin-category-form"
          onSubmit={handleAddCategory}
        >
          <div>
            <label htmlFor="categoryName">
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(event) =>
                setCategoryName(event.target.value)
              }
              placeholder="Enter category name"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? 'Adding...' : 'Add Category'}
          </button>
        </form>

        {categories.length === 0 ? (
          <p className="admin-empty">
            No categories found.
          </p>
        ) : (
          <div className="admin-category-list">
            {categories.map((category) => (
              <div
                className="admin-category-card"
                key={category._id}
              >
                {editingId === category._id ? (
                  <div className="admin-category-edit">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(event) =>
                        setEditingName(event.target.value)
                      }
                    />

                    <div className="admin-category-actions">
                      <button
                        type="button"
                        className="admin-enable-button"
                        onClick={() =>
                          handleUpdateCategory(
                            category._id
                          )
                        }
                        disabled={isSaving}
                      >
                        {isSaving
                          ? 'Saving...'
                          : 'Save'}
                      </button>

                      <button
                        type="button"
                        className="admin-delete-button"
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>
                      {category.name}
                    </h2>

                    <div className="admin-category-actions">
                      <button
                        type="button"
                        className="admin-edit-button"
                        onClick={() =>
                          handleStartEdit(category)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="admin-delete-button"
                        onClick={() =>
                          handleDeleteCategory(
                            category._id
                          )
                        }
                        disabled={
                          deletingId === category._id
                        }
                      >
                        {deletingId === category._id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminCategories;
