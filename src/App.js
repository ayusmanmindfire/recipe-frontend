import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { RecipesPage } from './pages/RecipesPage';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { Profile } from './pages/Profile';
import { RecipeDetails } from './pages/RecipeDetails';
import { AddRecipePage } from './pages/AddRecipePage';
import { EditRecipePage } from './pages/EditRecipePage';

function App() {
   return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
        <Route path='/editRecipe/:id' element={<EditRecipePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/addRecipe' element={<AddRecipePage />} />
        <Route path='/profile' element={<Profile />} />        
      </Routes>
    </>
  );
}

export default App;
