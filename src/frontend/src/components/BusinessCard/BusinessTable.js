import React from 'react';

import './BusinessCard.css';

const businessTable = (props) => (
    
    <tr>
        <td>{props.name}</td>
        <td>{props.rating}</td>
        <td>{props.phone}</td>
        <td>{props.address}</td>
    </tr>

);

export default businessTable;