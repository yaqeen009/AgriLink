import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing } from './pages/landing.page';

export default function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landing/>}/>
        </Routes>
    </div>
  )
}
