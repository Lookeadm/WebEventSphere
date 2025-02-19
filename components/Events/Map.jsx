import React from 'react'
import { useEffect } from 'react';

const GOONG_MAPS_API_KEY = "EulYIDSKezF0x9mBVpeYOZZHe7T1PszHnXHpIeGY";
const GOONG_TITLES_KEY = "CzM10BwFkxrsNoVophiP6gICaZjdLSM7op6nbEd3"

function Map() {
    useEffect(() => {
        const goongjs = require('@goongmaps/goong-js');
        goongjs.accessToken = GOONG_TITLES_KEY;
        const map = new goongjs.Map({
            container: 'map',
            style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
            center: [105.83991, 21.02800], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        // Cleanup function to remove the map instance
        return () => {
            map.remove();
        };
    }, []); // Thêm dependency array rỗng
    return (
        <div>
<div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    )
}

export default Map
