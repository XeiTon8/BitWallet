import React from 'react';

type CategoryCardProps = {
    title: string;
    imgUrl: string;
}
export const CategoryCard: React.FC<CategoryCardProps> = ({title, imgUrl}) => {

    return (
        <div className="popular-category__wrapper popular-category__bottom-container">

        <img src={imgUrl} alt="" />
        <span className="bottom-container__title">{title}</span>
        <button className="popular-categories__more-btn--not-hover-category safe-keys-category__btn">Show more</button>
    
    </div>
    
    )

   
}