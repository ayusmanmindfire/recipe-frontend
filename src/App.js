import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/Common/LandingPage';
import { RecipesPage } from './pages/Recipes/RecipesPage';
import { SignUp } from './pages/Users/SignUp';
import { Login } from './pages/Users/Login';
import { ErrorPage } from './pages/Common/ErrorPage';
import { Profile } from './pages/Users/Profile';
import { RecipeDetails } from './pages/Recipes/RecipeDetails';
import { AddRecipePage } from './pages/Recipes/AddRecipePage';
import { EditRecipePage } from './pages/Recipes/EditRecipePage';

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
