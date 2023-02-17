import React from 'react';
import {CartContext, Context} from '../../App'
import { isMobile } from 'react-device-detect';

// Images
import {
   
    reseller,
    guarantee,
    payment,
    support,
    cryptoWallets,
    externalHDD,
    cables,

} from '../../img/index'

// Components
import { CategoryCard } from '../../components/Cards/CategoryCard';
import { ProductCard } from '../../components/Cards/ProductCard';
import { BrandCard } from '../../components/Cards/BrandCard';
import { Menu } from '../../components/Menu';
import { Review } from '../../components/Review';
import { Faq } from '../../components/Faq';
import { AboutUs } from '../../components/AboutUs';
import { Footer } from '../../components/Footer';

// External scripts
import { Carousel } from '../../scripts/Carousel';


// Hooks
import { useFetch } from '../../hooks/useFetch';


export const Main = ({onGoHome}) => {

    {Carousel()};

    const {products, onAddToFavorites, isAuthOpened, setIsAuthOpened} = React.useContext(Context)
    const {onAddToCart} = React.useContext(CartContext)

    const [brands] = useFetch("brands");
    const [categories] = useFetch("categories")
   
    const [reviews] = useFetch("reviews")
    const [questions] = useFetch("faq")
    
    // Render

    const renderCategories = () => {
      return (categories.map((item) => (
            <CategoryCard
            key={item.id}
            title={item.title}
            imgUrl={item.imgUrl}
            />))
            ) 
    }

    const renderProducts = () => {
        return (products.sort((a, b) => a.id - b.id).map((item, index) => (
            <ProductCard 
            key={index}
            id={item.id}
            title={item.title}
            imgUrl={item.imgUrl}
            price={item.price}
            oldPrice={item.oldPrice}
            isDiscount={item.isDiscount}
            onClickCartButton={(obj) => onAddToCart(obj)}
            onClickFavoriteButton={(obj) => onAddToFavorites(obj)}
            />
            
            ))
        )}

    const renderBrands = () => {

      return (brands.sort((a, b) => a.id - b.id).map((item) => 
      (<BrandCard
      key={item.id}
      imgUrl={item.imgUrl}

      />
      )))  

    }

    const renderReviews = () => {
        return (
            reviews.map((item) => (
            <Review 
            key={item.id}
            author={item.author}
            body={item.body}
            rating={item.rating}
            />
            )))
    }

    return (

        <>

<main className="main" id="main">

<section className="promo-section">

<div className="promo-section__promo-BG">

<div className="first-screen__container"><Menu /></div>

</div>

</section>

{isMobile ? 
<div className="company_pros">

<div className="company-pros__container">

    <div className="company-pros__wrapper">

<div className="company-pros__mobile-wrapper">
<img src={reseller} alt="" className="company-pro reseller" />
<span className="company-pros-description first-pro">Oficcial re-seller in Ukraine</span>
</div>
<div className="company-pros__mobile-wrapper">
<img src={guarantee} alt="" className="company-pro " />
<span className="company-pros-description second-pro">Guarantee on every device</span>
</div>
<div className="company-pros__mobile-wrapper">
<img src={payment} alt="" className="company-pro " />
<span className="company-pros-description third-pro">Pay after delivery</span>
</div>
<div className="company-pros__mobile-wrapper">
<img src={support} alt="" className="company-pro " />
<span className="company-pros-description fourth-pro">Device configuration help</span>
</div>
        


    
        

    </div>

</div>

</div> 

:

<div className="company_pros">

<div className="company-pros__container">

    <div className="company-pros__wrapper">

        <img src={reseller} alt="" className="company-pro " />
        <span className="company-pros-description first-pro">Official re-seller in Ukraine</span>


        <img src={guarantee} alt="" className="company-pro " />
        <span className="company-pros-description second-pro">Guarantee on every device</span>


        <img src={payment} alt="" className="company-pro " />
        <span className="company-pros-description third-pro">Pay after delivery</span>


        <img src={support} alt="" className="company-pro " />
        <span className="company-pros-description fourth-pro">Device configuration support</span>

    </div>

</div>

</div>
}

<section className="main-good-catalog__section">

<article className='popular-categories'>

<div className='popular-categories__container'>

<div className='popular-categories__title-wrapper'>

<h2 className="popular-categories__title">Popular categories</h2>

</div>

<div className="popular-categories__flex-container">

<div className="popular-categories__crypto-wallets popular-category__wrapper">

<img src={cryptoWallets} alt="" className="crypto-wallets-category__img" />
<a className="crypto-wallets-category__title">Crypto wallets</a>
<button className="popular-categories__more-btn">Show more</button>

</div>

<div className="popular-categories__external-HDD popular-category__wrapper">

<img src={externalHDD} alt="" />
<span className="external-HDD-category__title">External HDDs</span>
<button className="popular-categories__more-btn--not-hover-category external-HDD__button">Show more</button>

</div>

<div className="popular-categories__cables popular-category__wrapper">

<img src={cables} alt="" />
<span className="cables-category__title">Cables</span>
<button className="popular-categories__more-btn--not-hover-category cables-category__btn">Show more</button>

</div>

{renderCategories()}

</div>

</div> {/* Container */}

</article>

<article className="popular-goods">

        <div className="popular-goods__container">

        <div className="popular-goods__title-and-btns">

<h2 className="popular-goods__title">Popular products</h2>

<div className="popular-goods__filters-btns-container">

    <button className="popular-goods-filters__btns">All products</button>
    <button className="popular-goods-filters__btns">Best sellers</button>
    <button className="popular-goods-filters__btns">Selling out</button>
    <button className="popular-goods-filters__btns btn-last">New</button>

</div>

</div>

    <div className="popular-goods__products-flex-container">

<div className="popular-goods__slider-carousel">

<ul>
{renderProducts()}
</ul>


</div>

    </div>


        </div>

</article>

<article className="popular-brands">

<div className="popular-brands__container">

<h2 className="popular-brands__title">Popular brands</h2>

<div id="carousel" className="popular-brands__logotypes-wrapper">
<button className="arrow prev">⇦</button>

            <div className="logotypes-wrapper__logotypes-carousel">

            <ul>

            {renderBrands()}
            

            </ul>

            </div>

<button className="arrow next">⇨</button>

</div>

</div>

</article>

</section>

<article className="banners">

<div className="banners__container">

<div className="banners-flex-wrapper">

<div className="banner-left banners-container">
       
        
        <div className="banner-left__content-bg-wrapper"></div>
        <div className="banner-left__img-second"></div>
        <div className="banner-left__content">
            
            <h2 className="banner__title">Banner title</h2>
            <span className="banner__description">Bitwallet is an online shop selling crypto wallets and accessories in Ukraine.</span>
            <button className="banner-btn"><a href="" className="banner-more__link">Show more</a></button>
            
            
            <div className="banner-left__coins"></div>
    
        </div>
        
    </div>
    
    <div className="banner-right banners-container">
    
        <div className="banner-right__content-bg-wrapper"></div>
    
        <div className="banner-right__img-second"></div>
        <div className="banner-right__content">
            
            <h2 className="banner__title">Banner title</h2>
            <span className="banner__description">Bitwallet is an online shop selling crypto wallets and accessories in Ukraine.</span>
            <button className="banner-btn">
                <a href="" className="banner-more__link">Show more</a>
            </button>
            
            
            <div className="banner-right__coins">
                
            
            </div>
            
    
                
        
        </div>
    
    
    </div>
    
</div>

</div>

</article>

<article className="reviews">

<div className="reviews__container">

<h2 className="reviews__title">Our customer's reviews</h2>

<div className="reviews-carousel__wrapper" id="reviews-carousel">

    <button className="arrow prev">⇦</button>
    <div className="reviews__carousel">

    {renderReviews()}

    </div>
    <button className="arrow next">⇨</button>

    <div className="reviews__rating-total-wrapper">

        <div className="reviews__rating-total-wrapper">
            <span className="reviews__rating-total">5</span>

            <ul className="review-rating-total-stars">
            <li className="review-rating__item star-large"></li>
            <li className="review-rating__item star-large"></li>
            <li className="review-rating__item star-large"></li>
            <li className="review-rating__item star-large"></li>
            <li className="review-rating__item star-large"></li>
            </ul>

        </div>

        <div className="reviews__reviews-count-total-wrapper">
            <span className="reviews__reviews-count-total">Total reviews: 11</span>
        </div>

        <div className="reviews__reviews-btn-wrapper">
            <button className="reviews__reviews-btn"><span className="reviews-btn__content">Write a review</span></button>
        </div>

    </div>

</div> 

</div> 

</article>

<article className="articles">

<div className="articles__container">

<div className="articles__title-and-btn-wrapper">
    <h2 className="articles-title">How to use crypto wallets</h2>
    <button className="articles__read-all-btn">Read all articles</button>
</div>

<div className="articles__new-articles-wrapper">

    <div className="article-with-banner">

    <h2 className="article-with-banner__title"><a href="#">Best crypto wallets</a></h2>
    <span className="article-with-banner__topic-of-the-day">Topic of the day</span>
    <span className="article-with-banner__description">Bitwallet is an online shop selling crypto wallets and accessories in Ukraine.</span>

    <span className="articles__reading-time reading-time-banner">Reading time: 17 minutes</span>
    <div className="article-with-banner__bg-wrapper"></div>
    <div className="article-with-banner__img"></div>
    </div>

<div className="new-articles__articles-wrapper--right">

    <div className="article">
        <span className="article__title">BitWallet — online shop of crypto wallets and accessories</span>
        <span className="article__description">
        Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. The official distributor gives a possibility to ...
        </span>
        <div className="article__tags-wrapper">
    
           <span className="articles__article-type article-tag"># Reviews</span>
           <span className="articles__article-reading-time article-tag">Reading time: <span>17 minutes</span></span>
           <span className="articles__article-publication-date article-tag">Published:<span>17.05.2022</span></span>
    
        </div>
    </div>

<div className="article">
        <span className="article__title">BitWallet — online shop of crypto wallets and accessories</span>
        <span className="article__description second-article-description">
        Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. The official distributor gives a possibility to ...
        </span>
        <div className="article__tags-wrapper">
    
          
           <span className="articles__article-reading-time article-tag">Reading time: <span>17 minutes</span></span>
           <span className="articles__article-publication-date article-tag">Published:<span>17.05.2022</span></span>
    
        </div>
</div>

</div>
</div>
</div>

</article>

<Faq questions={questions}/>
<AboutUs />

</main>
</>

)}

