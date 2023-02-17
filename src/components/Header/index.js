import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom'

import { CartContext, Context } from '../../App';

import { BurgerIcon } from '../BurgerIcon';
import { CloseBurgerIcon } from '../CloseBurgerIcon';

import {
    logo,
    mobileLogo,
    burgerIcon,
    phone,
    login,
    favorite,
    cart,
   

} from '../../img'
import './header.scss';



 export function Header ({isOrderPage, onGoHome,  onAccountClick, searchValue, setSearchValue, isBurgerOpen, setIsBurgerOpen}) {

    let navigate = useNavigate()

    const {onClickPage, setIsMain} = React.useContext(Context)
    const {onClickCart} = React.useContext(CartContext)

    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const onClickSearch = () => {

        if (searchValue.length >= 1) {
            setIsMain(false)
            navigate("/catalog")
        }
        else {
            alert("Вы ничего не ввели.")
        }}


    
    return (
<>

<div className={isBurgerOpen ? "burger-menu--active" : "burger-menu--hidden"}>

    <div className="burger-menu__socials-wrapper">
        <Link to="/favorites"><img src={favorite} onClick={onClickPage}/></Link>
        <a href="https://instagram.com/bitwalletua" className={`${isBurgerOpen ? "burger__ig" : "ig"} social`}> </a>
        <a href="https://www.facebook.com/bitwallet.ua" className={`${isBurgerOpen ? "burger__fb" : "fb"} social`}> </a>
        <CloseBurgerIcon 
    isBurgerOpened={isBurgerOpen}
    setIsBurgerOpened={setIsBurgerOpen}/>
        </div>

<ul className={`categories-list burger-categories`} >
            <span className="burger-menu__catalog">Catalog</span>
            <li className="categories-list__cryptowallets categories-list__item">Crypto wallets</li>
            <li className="categories-list__externals categories-list__item">External HDDs</li>
            <li className="categories-list__cables categories-list__item">Cables</li>
            <li className="categories-list__safekeys categories-list__item">Safe keys</li>
            <li className="categories-list__cases categories-list__item">Cases</li>
            <li className="categories-list__accessories categories-list__item">Accessories</li>
            <li className="categories-list__sets categories-list__item">Sets</li>
        </ul>

        <div className="burger__for-clients-wrapper">
            <ul>
                <li className="catalog-item catalog-title">For clients</li>
                <li className="catalog-item for-clients">Log In</li>
                <li className="catalog-item for-clients">About us</li>
                <li className="catalog-item for-clients">Reviews</li>
                <li className="catalog-item for-clients">Payment & Delivery</li>
                <li className="catalog-item for-clients">FAQ</li>
                <li className="catalog-item for-clients">Blog</li>
                <li className="catalog-item for-clients">Contacts</li>
                
            </ul>
        </div>

        <div className="burger__contact-info-wrapper">
            <ul>
                <li className="contact-title contact-item">Contact info</li>
                <li className="contact-phone contact-item"> (044) 344-87-50</li>
                <li className="contact-email contact-item contact-bot">heybitwalletbot</li>
                <li className="contact-email contact-item contact-mailbox">hello@bitwallet.com.ua</li>
                <li className="contact-address contact-item">Kyiv, Elizabeth Chavdar str, </li>
            </ul>
        </div>
</div>

<header className='header'>
    <div className='header__container'>
        <nav className="nav">
            <div className='menu__left'>
                <div className='logo-container'>
                    <picture>
                    <Link to="/">
                    <source media="((min-width: 320px) and (max-width: 766px))" srcSet={`${mobileLogo} 134w`} />
                    <source media="(min-width: 767px)" srcSet={`${logo} 200w`} />
                        <img 
                        className='logo' 
                        src={logo} 
                        srcSet={`${logo} 200w, ${mobileLogo} 134w`} 
                        onClick={onGoHome}
                        sizes="
                        (min-width: 320px) and (max-width: 768px) 134px,
                        (min-width: 767px) 200px"
                        />
                        </Link>
                    </picture>
                </div>
          
          
           <div className="city-select-block">
            <div className="city-icon">
               
            </div>
           
             <select className="city">
              
                 <option value="Kharkiv">Kharkiv</option>
                 <option value="Kharkiv">Odesa</option>
                 <option value="Kharkiv">Kyiv</option>
                 <option value="Kharkiv">Lviv</option>
                 <option value="Kharkiv">Dnipro</option>
             </select>
            
           </div>
               
               
               
         
       
            </div>

            <div className={isOrderPage ? "search-menu-hidden" : "search-menu"}>
                <label htmlFor="search-input"></label>
                <input type="search" className="search" id="search-input" value={searchValue} onChange={onSearch}/>
                <button type="submit" className={`search-menu-btn ${searchValue.length >=1 ? "search-menu__confirm-btn-moved" : "search-menu__confirm-btn"}`} onClick={onClickSearch}>

                  

                </button>
            </div>

<div className="menu__right menu-right">

<ul className="menu-right__list menu-right-list ">
<li className="menu-right-list_phone menu-right__list-item">
    <picture className="icon-container">
        <img src={phone} className="phone-icon" />
    </picture>
    <a href="tel: 0443448750" className="phone"> (044) 344-87-50</a>
</li>
<li className="menu-right__list-item">
    <img src={login} onClick={() => {onAccountClick();}} />
</li>
<li className="menu-right__list-item favorite-items">
    
    <Link data-testid="favorites-link" to="/favorites"><img src={favorite} onClick={onClickPage}/></Link>
    
</li>
<li className="menu-right__list-item">
   
    <img src={cart} onClick={onClickCart}/>

</li>
<li className="menu-right__list-item burger-menu">
    <BurgerIcon 
    isBurgerOpened={isBurgerOpen}
    setIsBurgerOpened={setIsBurgerOpen}/>
</li>
</ul>

</div>

        </nav>

    </div> 
   
</header>
</>
    )
};