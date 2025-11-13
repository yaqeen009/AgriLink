import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing } from './pages/landing.page';
import { Auth } from './pages/auth.page';

export default function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/auth' element={<Auth/>}/>
        </Routes>
    </div>
  )
}
