import React from "react";
import "./Navbar.css";
import UserInfo from "./UserInfo";

function Navbar({ userInfo, isMobile, isLoggedIn, logout }) {
    return (
        <div className="navbar">
            <p className="navbar__title">Spotify Playlist Composer</p>
            <section className=".navbar__userinfo">
                <UserInfo
                    logout={logout}
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                />
            </section>
        </div>
    );
}

export default Navbar;
