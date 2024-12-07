'use client';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Bio from './components/Bio';

export default function Home() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/bio" element={<Bio />} />
            </Routes>
        </Router>
    );
}