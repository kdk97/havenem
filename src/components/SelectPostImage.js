import React from 'react';
import missingimage from "../assets/img/no-image.png"

export default function SelectPostImage() {

    return (
        <div>
            <h2>Upload billede</h2>
            <img src={missingimage} alt="Vælg billede"/>
            <button>Opret</button>
        </div>
    )
}