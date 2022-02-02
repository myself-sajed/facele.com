import React from 'react';
import '../css/Card.css'

const Card = ({ cardContent, children }) => {
    return <div className="card__padding">

        <div className="card text-center mt-5">
            <div>
                {cardContent.heading}
                <hr />
            </div>
            <div className="card-body">
                <h5 className="card-title">{cardContent.subHeading}</h5>
                <div className="card-text">{children}</div>
            </div>

        </div>


    </div>;
};

export default Card;
