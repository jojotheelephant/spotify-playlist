import React from "react";
import "./UserInfo.css";

// import tooltip
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

function UserInfo({ userInfo, isMobile, isLoggedIn, logout }) {
    // Rendering Components for logout button
    const logoutButton = () => {
        return <Tooltip
                    title="Logout"
                    arrow
                    TransitionComponent={Zoom}
                >
                    <button className="userinfo__logoutButton" onClick={logout}>
                        <span className="material-icons">logout</span>
                    </button>
                </Tooltip>
    }

    // ----- CONDITIONAL RENDERING -----
    const conditionalRender = () => {
        if (isLoggedIn === false) {
            return;
        } else if (isMobile && isLoggedIn) {
            return (logoutButton() )
        } else if (!isMobile && isLoggedIn) {
            return (
                <div className="userinfo__section">
                    <img
                        src={userInfo.image}
                        alt="user-pic"
                        className="userinfo__img"
                    />
                    <div className="userInfo__display-name">
                        {userInfo.display_name}
                    </div>
                    {logoutButton()}
                </div>
            );
        }
    };

    return <div className="userinfo">{conditionalRender()}</div>;
}

export default UserInfo;
