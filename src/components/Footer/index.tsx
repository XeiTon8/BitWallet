import React from 'react'
import "./footer.scss"
import { isMobile } from "react-device-detect"
import { BurgerIcon } from "../BurgerIcon"

type FooterProps = {
    isBurgerOpen: boolean;
    setIsBurgerOpen: (burger: boolean) => void
}
export const Footer: React.FC<FooterProps> = ({isBurgerOpen, setIsBurgerOpen}) => {

    return (

        <footer className="footer">
            
            <div className="footer__bg">

                <div className="footer__container">
<div className="footer_catalog_flex">
    <div className="footer-logotype-wrapper">
        {isMobile ? 
        <div className="footer-logotype-mobile-wrapper">
            <img src="https://firebasestorage.googleapis.com/v0/b/bitwallet-56e26.appspot.com/o/footer-logo.png?alt=media&token=22ed19cc-fc2e-4f79-9e97-523557e5c918" alt="" className="footer-logotype" />
            <BurgerIcon isBurgerOpened={isBurgerOpen} setIsBurgerOpened={setIsBurgerOpen}/>
        </div> : 
            <>
            <img src="https://firebasestorage.googleapis.com/v0/b/bitwallet-56e26.appspot.com/o/footer-logo.png?alt=media&token=22ed19cc-fc2e-4f79-9e97-523557e5c918" alt="" className="footer-logotype" />
            <span>We support</span><img src="https://firebasestorage.googleapis.com/v0/b/bitwallet-56e26.appspot.com/o/footer-payments.png?alt=media&token=70b61c71-1de4-460d-bfe9-d7e9ac39710e" alt="" className="footer-payments" />
            </>}
       
        </div>
        
        <div className="footer-catalog-wrapper">
            <ul>
                <li className="catalog-item catalog-title">Catalog</li>
                <li className="catalog-item">Crypto wallets</li>
                <li className="catalog-item">Mining</li>
                <li className="catalog-item">ATMs</li>
                <li className="catalog-item">Tokens and smrt cards</li>
                <li className="catalog-item">Accessories</li>
                <li className="catalog-item">Data encryption</li>
                
            </ul>
        </div>
     
    
        <div className="footer-for-clients-wrapper">
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

        <div className="contact-info-wrapper">
            <ul>
                <li className="contact-title contact-item">Contact info</li>
                <li className="contact-phone contact-item"> (044) 344-87-50</li>
                <li className="contact-email contact-item contact-bot">heybitwalletbot</li>
                <li className="contact-email contact-item contact-mailbox">hello@bitwallet.com.ua</li>
                <li className="contact-address contact-item">Kyiv, Elizabeth Chavdar str</li>
            </ul>
        </div>
</div>
    

   
  

</div>
                </div>
            
        </footer>
    )

}