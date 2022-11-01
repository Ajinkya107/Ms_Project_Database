import React, { useEffect, useState } from "react";
import './Header.css';
import logo from '../../img/site_logo.png'
import { Outlet, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Header = () => {
    return (
        <>
            <div class="header">
                <a href="/" class="logo"></a>
                <div class="header-right">
                    <Link to="/">Dashboard</Link>
                    <Link to="/AddProject">AddProject</Link>
                    <Link to="/AssignRole">AssignRole</Link>
                    <Link to="/AddProjectMilestone">ProjectMilestones</Link>
                    <Link to="/Projects">Projects</Link>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Header;