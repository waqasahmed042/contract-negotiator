/* eslint-disable prettier/prettier */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "../components/views/Questions/Questions";
import Comments from "../components/views/comments/Comments";

const RouterApp: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Questions />} />
                <Route path="/comments" element={<Comments />} />
            </Routes>
        </Router>
    )
}

export default RouterApp;
