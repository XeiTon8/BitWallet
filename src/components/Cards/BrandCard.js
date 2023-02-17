import React from 'react';

export const BrandCard = ({imgUrl}) => {
    return (
        <li className="brand">

                    <a href="#" className="brand-link">
                        <img src={imgUrl} alt="" />
                    </a>
    

        </li>
    )
}