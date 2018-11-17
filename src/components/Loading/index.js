import React from 'react';
import './style/style.scss'

export default function Loading(props) {
    return (
        <div className="msearch__loading">
            <div className="msearch__loading-inner">
                <div className="msearch__loading-item"></div>
                <div className="msearch__loading-item"></div>
                <div className="msearch__loading-item"></div>
                <div className="msearch__loading-item"></div>
                <div className="msearch__loading-item"></div>
            </div>
        </div>
    )
}

