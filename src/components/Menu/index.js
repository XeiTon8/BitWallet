import React from 'react';
import { Link } from 'react-router-dom';
import {isMobile} from 'react-device-detect'

import { Context } from '../../App';

import { product } from '../../img';

import "./menu.scss"

export const Menu = () => {
const {isMain} = React.useContext(Context);
const [isCatalogButtonActive, setIsCatalogButtonActive] = React.useState(false);

const openCatalog = () => setIsCatalogButtonActive(!isCatalogButtonActive);

    return (

<>
{isMain ? 

<> <nav className="promo-section__nav">
    
    <div className="promo-section__dropdown-catalog dropdown-catalog">

    <button className= {`dropdown-btn ${isCatalogButtonActive ? "dropdown-catalog__dropdown-btn--active" : "dropdown-catalog__dropdown-btn"}`} onClick={openCatalog}>
            <span className="dropdown-btn__content">

                <span>Catalog</span>

            </span>
            <ul className={`categories-list ${isCatalogButtonActive ? "dropdown-catalog__categories-list--active" :  "dropdown-catalog__categories-list--hidden"}`} >
            <li className="categories-list__cryptowallets categories-list__item">Cryptowallets</li>
            <li className="categories-list__externals categories-list__item">External HDDs</li>
            <li className="categories-list__cables categories-list__item">Cables</li>
            <li className="categories-list__safekeys categories-list__item">Safekeys</li>
            <li className="categories-list__cases categories-list__item">Cases</li>
            <li className="categories-list__accessories categories-list__item">Accessories</li>
            <li className="categories-list__sets categories-list__item">Sets</li>
        </ul>
    </button>
      

    </div>

    <div className="menu-and-social">

        <ul className="promo-section-nav__menu nav-menu">

            <li className="nav-menu__list-item"><a href="#" className="go-home-link"></a></li>
            <li className="nav-menu__list-item"><a href="#">About us</a></li>
            <li className="nav-menu__list-item"><a href="#">Reviews</a></li>
            <li className="nav-menu__list-item"><a href="#">Payment & Delivery</a></li>
            <li className="nav-menu__list-item"><a href="#">FAQ</a></li>
            <li className="nav-menu__list-item"><a href="#">Blog</a></li>
            <li className="nav-menu__list-item"><a href="#">Contacts</a></li>

        </ul>


        <div className="nav-menu__social-and-lang">

            <a href="https://instagram.com/bitwalletua" className="social ig"> </a>

            <a href="https://www.facebook.com/bitwallet.ua" className="social fb"> </a>

            <select name="lang-select" id="select-lang">

                <option value="UK">EN</option>
                <option value="UA">UA</option>

            </select>
 

        </div>



    </div> {/* menu and social */}

</nav>

{isMobile ? 
    <>
    <div className="promo-section__flex-wrapper">
    <h2 className="promo-section__product-title">Bitbox 02 Multi edition</h2>
    <picture>
    <img src={product} alt="" className="product-img" width="520" />
    </picture>
    <span className="promo-section__product-description">BitBox02 Multi edition supports such tokens as Bitcoin (BTC), Litecoin (LTC), Ethereum (ETH) and ERC-20.</span>
    <div className="promo-section__mobile-price-wrapper">
            <span className="promo-section__product-price">3 990 UAH</span>
            <span className="promo-section__product-price-discount">4 300 UAH</span>
            </div>
        <div className="promo-section__add-to-cart-wrap">
            <button type="submit" className="promo-section__add-to-cart-btn">
                    <span className="add-to-cart-btn__content"> <span>Add to cart</span> </span>
            </button>

            </div>
    </div>
    </> 
    :
    <div className="promo-section__flex-wrapper">
        <div className="promo-section__product-promo">
            <picture>
                <img src={product} alt="" className="product-img" width="520" />
            </picture>
        </div>

        <div className="promo-section__content">
            <h2 className="promo-section__product-title">Bitbox 02 Multi edition</h2>
            <span className="promo-section__product-description">BitBox02 Multi edition supports such tokens as Bitcoin (BTC), Litecoin (LTC), Ethereum (ETH) and ERC-20.</span>
            <div className="promo-section__mobile-price-wrapper">
            <span className="promo-section__product-price">3 990 UAH</span>
            <span className="promo-section__product-price-discount">4 300 UAH</span>
            </div>
           
            <div className="promo-section__add-to-cart-wrap">
                <button type="submit" className="promo-section__add-to-cart-btn">
                    <span className="add-to-cart-btn__content"> <span>Add to cart</span> </span>
                </button>
            </div>

        </div>
    </div> 
}
    
</>
    :
    <div className="menu-notMain">
        <div className="menu-notMain__container">
 <nav className="promo-section__nav">
    
    <div className="promo-section__dropdown-catalog">
    
    <button className= {`dropdown-btn ${isCatalogButtonActive ? "dropdown-catalog__dropdown-btn--active" : "dropdown-catalog__dropdown-btn"}`} onClick={openCatalog}>
            <span className="dropdown-btn__content"><span>Catalog</span></span>
            <ul className={`categories-list ${isCatalogButtonActive ? "dropdown-catalog__categories-list--active" :  "dropdown-catalog__categories-list--hidden"}`} >
            <li className="categories-list__cryptowallets categories-list__item">Cryptowallets</li>
            <li className="categories-list__externals categories-list__item">External HDDs</li>
            <li className="categories-list__cables categories-list__item">Cables</li>
            <li className="categories-list__safekeys categories-list__item">Safekeys</li>
            <li className="categories-list__cases categories-list__item">Cases</li>
            <li className="categories-list__accessories categories-list__item">Accessories</li>
            <li className="categories-list__sets categories-list__item">Sets</li>     
            
        </ul>
    </button>
    
    </div>
    
    <div className="menu-and-social">
    
        <ul className="promo-section-nav__menu nav-menu">
    
            <li className="nav-menu__list-item"><a href="#" className="go-home-link"></a></li>
            <li className="nav-menu__list-item"><a href="#">About us</a></li>
            <li className="nav-menu__list-item"><a href="#">Reviews</a></li>
            <li className="nav-menu__list-item"><a href="#">Payment & Delivery</a></li>
            <li className="nav-menu__list-item"><a href="#">FAQ</a></li>
            <li className="nav-menu__list-item"><a href="#">Blog</a></li>
            <li className="nav-menu__list-item"><a href="#">Contacts</a></li>

    
        </ul>
    
    
        <div className="nav-menu__social-and-lang">
    
            <a href="https://instagram.com/bitwalletua" className="social ig"> </a>
    
            <a href="https://www.facebook.com/bitwallet.ua" className="social fb"> </a>
    
            <select name="lang-select" id="select-lang">
    
                <option value="UK">EN</option>
                <option value="UA">UA</option>
             
    
            </select>
           
    
        </div>
    
    
    
    </div> {/* menu and social */}
    
    </nav>
    </div>
    </div> 
   
} 

</>

    )
}

