import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainScreen() {
    return (
        <div className="top-screen">
            <div className="back__top-screen">
                <div className="container">
                    <div className="top-screen__content">
                        <h2>Змагання зі <br /> спортивних-бальних танців</h2>
                        <NavLink to='/'>Переглянути змагання</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
