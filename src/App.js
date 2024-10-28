// Third-party imports
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Static imports
import './App.css';
import Navbar from './components/Navbar';
import SimpleBackdrop from './components/Loader';

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('./pages/Common/LandingPage'));
const RecipesPage = lazy(() => import('./pages/Recipes/RecipesPage'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Login = lazy(() => import('./pages/Auth/Login'));
const ErrorPage = lazy(() => import('./pages/Common/ErrorPage'));
const Profile = lazy(() => import('./pages/Auth/Profile'));
const RecipeDetails = lazy(() => import('./pages/Recipes/RecipeDetails'));
const AddRecipePage = lazy(() => import('./pages/Recipes/AddRecipePage'));
const EditRecipePage = lazy(() => import('./pages/Recipes/EditRecipePage'));

// Wrapper component to handle navigation layout
function NavWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SimpleBackdrop isLoading={true} />}>
        <Outlet /> {/* Renders the specific route component */}
      </Suspense>
    </>
  );
}

function App() {
  return (    
      <Routes>
        {/* Routes wrapped in NavWrapper for consistent navbar layout */}
        <Route element={<NavWrapper />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
          <Route path='/editRecipe/:id' element={<EditRecipePage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addRecipe' element={<AddRecipePage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>
      </Routes>
  );
}

export default App;
