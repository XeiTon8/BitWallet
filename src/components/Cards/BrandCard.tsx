import React from 'react';

type BrandCardProps = {
    imgUrl: string;
}
export const BrandCard: React.FC<BrandCardProps> = ({imgUrl}) => {
    return (
        <li className="brand">

                    <a href="#" className="brand-link">
                        <img src={imgUrl} alt="" />
                    </a>
    

        </li>
    )
}