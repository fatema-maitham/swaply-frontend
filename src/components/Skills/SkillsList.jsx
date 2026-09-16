import { useEffect, useState } from 'react';

import { Link } from 'react-router';

import {
  getCategories,
  getSkills,
} from '../../services/skillService';

import { getReviews } from '../../services/reviewService';

import SkillCard from './SkillCard';

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const skillsPerPage = 12;

  useEffect(() => {
    const loadSkillsPage = async () => {
      try {
        setError('');

        const [skillsData, categoriesData] =
          await Promise.all([
            getSkills(),
            getCategories(),
          ]);

        setSkills(skillsData);

        setCategories([
          'All',
          ...categoriesData.map(
            (item) => item.name
          ),
        ]);

        try {
          const reviewsData = await getReviews();
          setReviews(reviewsData);
        } catch (reviewError) {
          console.log(
            'REVIEWS COULD NOT LOAD:',
            reviewError
          );

          setReviews([]);
        }
      } catch (err) {
        console.log(err);

        setError(
          'Failed to load skills and categories.'
        );
      }
    };

    loadSkillsPage();
  }, []);

  const getAverageRating = (skill) => {
    const skillId = String(skill._id);

    const skillReviews = reviews.filter((review) => {
      const reviewSkillId = String(
        review.skill?._id || review.skill
      );

      return reviewSkillId === skillId;
    });

    if (skillReviews.length === 0) {
      return null;
    }

    const totalRating = skillReviews.reduce(
      (total, review) =>
        total + Number(review.rating),
      0
    );

    return totalRating / skillReviews.length;
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      category === 'All' ||
      skill.category === category;

    const matchesSearch =
      skill.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(
    filteredSkills.length / skillsPerPage
  );

  const startIndex =
    (currentPage - 1) * skillsPerPage;

  const currentSkills = filteredSkills.slice(
    startIndex,
    startIndex + skillsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    selectedCategory
  ) => {
    setCategory(selectedCategory);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="skills-page">
      <section className="skills-header">

        <div>

          <p className="skills-eyebrow">
            EXPLORE
          </p>

          <h1>
            Explore Skills
          </h1>

          <p className="skills-description">
            Discover skills from the Swaply community
            and find something new to learn.
          </p>

        </div>

        <Link
          to="/skills/new"
          className="add-skill-button"
        >
          + Add a Skill
        </Link>

      </section>

      {error && (
        <p className="form-message">
          {error}
        </p>
      )}

      <section className="skills-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="category-tabs">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-tab ${category === item
                ? 'active'
                : ''
                }`}
              onClick={() =>
                handleCategoryChange(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {currentSkills.length === 0 ? (
        <div className="no-skills">
          <h2>No skills found</h2>

          <p>
            Try a different search or category.
          </p>
        </div>
      ) : (
        <>
          <section className="skills-grid">
            {currentSkills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                averageRating={getAverageRating(skill)}
              />
            ))}
          </section>

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination">
                <button
                  type="button"
                  onClick={() =>
                    goToPage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      goToPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    goToPage(currentPage + 1)
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default SkillsList;