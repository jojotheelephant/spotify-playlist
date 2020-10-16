import React from "react";
import "./PageIndex.css";

// import Material UI
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

function PageIndex({ index, prevPage, nextPage }) {
    // ----- METHODS -----
    // Next Page button handler
    const eventHandlerNext = () => {
        nextPage();
    };

    // Prev Page Button handler
    const eventHandlerPrev = () => {
        prevPage();
    };

    const indexToPage = () => {
        return (index/10 + 1)
    }

    // Conditional Rendering of Previous Arrow Button
    const displayPrev = () => {
        if (index !== 0) {
            return (
                <Tooltip title="Previous page" arrow TransitionComponent={Zoom}>
                    <button
                        className="pageIndex__prev"
                        onClick={eventHandlerPrev}
                    >
                        {"<"}
                    </button>
                </Tooltip>
            );
        } else {
            return <button className="hiddenarrow">{"<"}</button>;
        }
    };
    
    return (
        <div className="pageIndex">
            {displayPrev()}
            <h1>{indexToPage()}</h1>
            <Tooltip title="Next Page" arrow TransitionComponent={Zoom}>
                <button className="pageIndex__next" onClick={eventHandlerNext}>
                    {">"}
                </button>
            </Tooltip>
        </div>
    );
}

export default PageIndex;
