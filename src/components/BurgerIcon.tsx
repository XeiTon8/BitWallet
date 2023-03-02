import React from 'react'
import {useSelector} from 'react-redux'
import {selectCart} from '../redux/cart/selectors'

type BurgerIconProps = {
  isBurgerOpened: boolean;
  setIsBurgerOpened: (value: boolean) => void;
}
export const BurgerIcon: React.FC<BurgerIconProps> = ({isBurgerOpened, setIsBurgerOpened}) => {

 const {isCartOpened} = useSelector(selectCart);

    return (
        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {setIsBurgerOpened(!isBurgerOpened)}} className={`${isCartOpened ? "burger-hidden" : "burger-icon"} ${isBurgerOpened ? "burger-hidden" : ""}`}>
        <path d="M0 1H21M0 9H21M0 17H21" stroke="#19A364" stroke-width="2"/>
        </svg>
        
    )
}