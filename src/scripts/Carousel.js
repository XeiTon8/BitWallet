import React from 'react';
import {isMobile} from 'react-device-detect';
import '../pages/Main';


export function Carousel() {

    React.useEffect(() => {
        function BrandCarousel() {
            let carousel = document.getElementById('carousel');
            let i = 1;
            for(let li of carousel.querySelectorAll('li')) {
              li.style.position = 'relative';
              li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0"></span>`);
              i++;
            }
        
          
            let width = 203; 
            let count = 6; 
            let list = carousel.querySelector('ul');
            let listElems = carousel.querySelectorAll('li');
        
            let position = 0; 
        
            carousel.querySelector('.prev').onclick = () => {
             
              position +=  (width - count);
             
              position = Math.min(position, 0)
              list.style.marginLeft = position + 'px';
            };
        
            carousel.querySelector('.next').onclick = () => {
            
              position -=  width + count;
              
              position = Math.max(position, - width + (listElems.length - count));
              list.style.marginLeft = position + 'px';
            };
        }
    
       async function reviewsCarousel() {
          let carousel = await document.getElementById('reviews-carousel');
          let i = 1;
          for(let div of carousel.querySelectorAll('review-item')) {
            div.style.position = 'relative';
            div.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0"></span>`);
            i++;
          }
          
          let width = null; 
          {isMobile ? 
        width = 300 : width = 436}
         
          let count = 4; 
          let list = await carousel.querySelector('div');
          let listElems = await carousel.querySelectorAll('review-item');
      
          let position = 0; 
      
          carousel.querySelector('.prev').onclick = () => {
           
            position +=  (width - count);
           
            position = Math.min(position, 0)
            list.style.marginLeft = position + 'px';
          };
      
          carousel.querySelector('.next').onclick = () => {
          
            position -=  width + count;
            
            position -=  Math.max(position, 0);
            list.style.marginLeft = position + 'px';
          };
      }

        BrandCarousel()
        reviewsCarousel()
    
       }, [])
    


}

   