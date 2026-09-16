import { useContext } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import NavBar from './components/NavBar/NavBar';

import Footer from './components/Footer/Footer';

import SignUpForm from './components/SignUpForm/SignUpForm';

import SignInForm from './components/SignInForm/SignInForm';

import Landing from './components/Landing/Landing';

import Dashboard from './components/Dashboard/Dashboard';

import Community from './components/Community/Community';

import Profile from './components/Profile/Profile';

import ProfileForm from './components/Profile/ProfileForm';

import UserDetails from './components/Profile/UserDetails';

import SkillsList from './components/Skills/SkillsList';

import SkillForm from './components/Skills/SkillForm';

import SkillDetails from './components/Skills/SkillDetails';

import SwapList from './components/Swaps/SwapList';

import SwapDetails from './components/Swaps/SwapDetails';

import SwapForm from './components/Swaps/SwapForm';

import SwapEdit from './components/Swaps/SwapEdit';

import ReviewList from './components/Reviews/ReviewList';

import ReviewDetails from './components/Reviews/ReviewDetails';

import ReviewForm from './components/Reviews/ReviewForm';

import AdminDashboard from './components/Admin/AdminDashboard';

import AdminUsers from './components/Admin/AdminUsers';

import AdminSkills from './components/Admin/AdminSkills';

import AdminCategories from './components/Admin/AdminCategories';

import AdminSwaps from './components/Admin/AdminSwaps';

import AdminReviews from './components/Admin/AdminReviews';

import AdminAuditLogs from './components/Admin/AdminAuditLogs';

import { UserContext } from './contexts/UserContext';

import './App.css';

const App = () => {
  const { user } = useContext(UserContext);

  const location = useLocation();

  const isAdmin = user?.role === 'admin';

  // Hide the normal Navbar and Footer on every admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <NavBar />}

      <Routes>

        {/* =========================================
            HOME
        ========================================= */}

        <Route
          path="/"
          element={
            !user ? (
              <Landing />
            ) : isAdmin ? (
              <AdminDashboard />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* =========================================
            AUTH
        ========================================= */}

        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />

        <Route
          path="/sign-in"
          element={<SignInForm />}
        />

        {/* =========================================
            PROFILE
        ========================================= */}

        <Route
          path="/profile"
          element={
            user ? <Profile /> : <SignInForm />
          }
        />

        <Route
          path="/profile/edit"
          element={
            user ? <ProfileForm /> : <SignInForm />
          }
        />

        {/* =========================================
            DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard /> : <SignInForm />
          }
        />

        {/* =========================================
            COMMUNITY
            PUBLIC
        ========================================= */}

        <Route
          path="/community"
          element={<Community />}
        />

        {/* Public profile of another user */}
        <Route
          path="/users/:id"
          element={<UserDetails />}
        />

        {/* =========================================
            SKILLS
            PUBLIC VIEWING
        ========================================= */}

        <Route
          path="/skills"
          element={<SkillsList />}
        />

        <Route
          path="/skills/:id"
          element={<SkillDetails />}
        />

        {/* =========================================
            SKILLS
            PROTECTED ACTIONS
        ========================================= */}

        <Route
          path="/skills/new"
          element={
            user ? <SkillForm /> : <SignInForm />
          }
        />

        <Route
          path="/skills/:id/edit"
          element={
            user ? <SkillForm /> : <SignInForm />
          }
        />

        {/* =========================================
            SWAPS
            PROTECTED
        ========================================= */}

        <Route
          path="/swaps"
          element={
            user ? <SwapList /> : <SignInForm />
          }
        />

        <Route
          path="/swaps/new"
          element={
            user ? <SwapForm /> : <SignInForm />
          }
        />

        <Route
          path="/swaps/:swapId"
          element={
            user ? <SwapDetails /> : <SignInForm />
          }
        />

        <Route
          path="/swaps/:swapId/edit"
          element={
            user ? <SwapEdit /> : <SignInForm />
          }
        />

        {/* =========================================
            REVIEWS
            PROTECTED
        ========================================= */}

        <Route
          path="/reviews"
          element={
            user ? <ReviewList /> : <SignInForm />
          }
        />

        <Route
          path="/reviews/:reviewId"
          element={
            user ? <ReviewDetails /> : <SignInForm />
          }
        />

        <Route
          path="/reviews/new"
          element={
            user ? <ReviewForm /> : <SignInForm />
          }
        />

        {/* =========================================
            ADMIN
        ========================================= */}

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/users"
          element={
            isAdmin ? (
              <AdminUsers />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/skills"
          element={
            isAdmin ? (
              <AdminSkills />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/categories"
          element={
            isAdmin ? (
              <AdminCategories />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/swaps"
          element={
            isAdmin ? (
              <AdminSwaps />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/reviews"
          element={
            isAdmin ? (
              <AdminReviews />
            ) : (
              <SignInForm />
            )
          }
        />

        <Route
          path="/admin/audit-logs"
          element={
            isAdmin ? (
              <AdminAuditLogs />
            ) : (
              <SignInForm />
            )
          }
        />

      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;