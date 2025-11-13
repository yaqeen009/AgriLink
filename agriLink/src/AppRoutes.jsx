import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing } from './pages/landing.page';
import { Login } from './pages/login.page';
import { SignUp } from './pages/signUp.page';

export default function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    </div>
  )
}
