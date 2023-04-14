import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Layout from "./components/Layout";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

function App() {

    return (
        <div className="App">
            <div className="content">
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage />} />
                        <Route path="products-page" element={<ProductsPage />} />
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
