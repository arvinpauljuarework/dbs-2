import React from 'react';

import './BusinessCard.css';

const businessCard = (props) => (
    
    <div className="col-md-3 col-xs-12 col-sm-12 card business-card">
        <img className="card-img-top" src={props.image_url} alt=""></img>
        
        <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">Rating: {props.rating}</p>
            <p className="card-text">Phone: {props.phone}</p>
            <p className="card-text">Address: {props.address}</p>
        </div>
    </div>

);

export default businessCard;