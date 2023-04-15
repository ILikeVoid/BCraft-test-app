import React, {useEffect} from 'react';
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import GameDetailsPage from "./pages/GameDetailsPage/GameDetailsPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";
import TeamsDetailsPage from "./pages/TeamsDetailsPage/TeamsDetailsPage";

function App() {

    return (
        <div className="App">
            <div className="content">
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="games" element={<GamesPage/>}/>
                        <Route path="games/:gameId" element={<GameDetailsPage/>}/>
                        <Route path="teams" element={<TeamsPage/>}/>
                        <Route path="teams/:teamId" element={<TeamsDetailsPage/>}/>
                    </Route>
                    <Route path="/sign-in" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<RegistrationPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
