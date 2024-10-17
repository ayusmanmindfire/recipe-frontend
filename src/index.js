import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecipesPage } from './pages/RecipesPage';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { CookiesProvider } from 'react-cookie';
import { ErrorPage } from './pages/ErrorPage';
import { RecipeForm } from './pages/RecipeForm';
import { Profile } from './pages/Profile';
import { RecipeDetails } from './pages/RecipeDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/recipes' element={<RecipesPage/>}/>
      <Route path='/recipes/:id' element={<RecipeDetails/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/error' element={<ErrorPage/>}/>
      <Route path='/addRecipe' element={<RecipeForm/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
