import React from 'react';

type ReviewProps = {
    author: string;
    rating: number;
    body: string;
}

export const Review: React.FC<ReviewProps> = ({author, rating, body}) => {

    function getStars(rating: number) {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (rating - 1 < i) {
                stars.push(<span className="review-rating__item-no-hover"></span>)
            }

            else {
                stars.push(<span className="review-rating__item"></span>)
            }
        }
        

        return stars;
    }

    function getRating() {return (<li className="stars">{getStars(rating)}</li>)}

    return (
        
        <div className="review-item">
            
                        <span className="review-name">{author}</span>
                        <ul className="review-rating">

                        {getRating()}

                        </ul>

                        <span className="review-description">
                        {body}
                        </span>
            
                        </div>
                        
        
    )

}