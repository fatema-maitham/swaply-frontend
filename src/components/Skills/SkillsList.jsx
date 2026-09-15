import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getSkills } from '../../services/skillService';
import SkillCard from './SkillCard';

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const skillsPerPage = 12;

  const categories = [
    'All',
    'Programming & Technology',
    'Design & Creative',
    'Languages',
    'Business & Career',
    'Education & Tutoring',
    'Music',
    'Cooking & Food',
    'Sports & Fitness',
    'Arts & Crafts',
    'Lifestyle',
    'Outdoor & Adventure',
    'Other',
  ];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills.');
      }
    };

    loadSkills();
  }, []);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      category === 'All' || skill.category === category;

    const matchesSearch =
      skill.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  const startIndex = (currentPage - 1) * skillsPerPage;
  const currentSkills = filteredSkills.slice(
    startIndex,
    startIndex + skillsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (selectedCategory) => {
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
          <h1>Explore Skills</h1>
          <p>
            Discover skills from the Swaply community and find
            something new to learn.
          </p>
        </div>

        <Link to="/skills/new" className="add-skill-button">
          + Add a Skill
        </Link>
      </section>

      {error && <p className="form-message">{error}</p>}

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
              className={`category-tab ${category === item ? 'active' : ''
                }`}
              onClick={() => handleCategoryChange(item)}
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
              />
            ))}
          </section>

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination">

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page ? 'active' : ''
                    }
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
