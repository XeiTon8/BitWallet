import React from 'react'

type CloseBurgerIconProps = {
    isBurgerOpened: boolean;
    setIsBurgerOpened: (val: boolean) => void;
}

export const CloseBurgerIcon: React.FC<CloseBurgerIconProps> = ({isBurgerOpened, setIsBurgerOpened}) => {

    return (
<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {setIsBurgerOpened(!isBurgerOpened)}} className={isBurgerOpened ? "close-burger" : ""}>
<path d="M1.70718 1.23926L19.7072 18.2029M19.293 1.23926L1.29297 18.2029" stroke="#19A364" stroke-width="2"/>
</svg>
    )


}