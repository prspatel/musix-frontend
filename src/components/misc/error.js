import React from "react";

export default function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <span style={{ color: "red", fontFamily: "Roboto, sans-serif" }}>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    );
}