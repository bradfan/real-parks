import React, { useContext } from 'react';
import Context from "../utils/Context";
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';

function ParkInfo({ component }) {
    const {name, description, directions, image, designation} = useContext(Context);
    return (
        <div>
            {component === 'dashboard' ? <Dashboard /> : <Favorites />}
        </div>
    )
}

export default ParkInfo
