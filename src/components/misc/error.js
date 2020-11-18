import React from "react";

export default function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <span style={{ color: "red", fontFamily: "Roboto, sans-serif" }}>{props.message}</span>
            <button style={{ margin: "5px", border: "0px", padding: "3px 10px 3px 10px", borderRadius: "15px", backgroundColor: "transparent" }} onClick={props.clearError}> X </button>
        </div>
    );
}