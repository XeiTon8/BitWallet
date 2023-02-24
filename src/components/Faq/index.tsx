import React from 'react';
import { isMobile } from 'react-device-detect';
import { FaqQuestion } from './FaqQuestion';
import "./Faq.scss"

type FaqProps = {
    questions: {
        id: number;
        question: string;
        answer: string;
    }[]
}

export const Faq: React.FC<FaqProps> = ({questions}) => {
  
    const renderQuestions = () => {
        return (questions.map((item) => (
         <FaqQuestion 
         key={item.id}
         question={item.question}
         answer={item.answer}/>
     )))}

    return (

        <article className="FAQ">

            <div className="FAQ__container">

                <h2 className="FAQ-title">FAQ</h2>

{isMobile ? <>
<div className="accordion-FAQ-wrapper">{renderQuestions()}</div><div className="questions-banner">
                    <div className="questions-banner-content">

                        <h2 className="questions-banner-title">Still have questions ?</h2>
                        <span className="questions-banner-description">Request a call and our managers will contact you as soon as possible!</span>
                        <div className="call-me-wrapper">
                            <input type="tel" className="banner-input-phone" placeholder="+38 (___) ___-__-__" />
                            <button type="submit" className="banner-call-me-btn"></button>
                        </div>

                        <span>By clicking on the button you agree to the terms of the site</span>
                        <button className="call-me-btn">Request a call back</button>
                    </div>


                </div></> 
                : 
                <>
                <div className="questions-banner">
                    <div className="questions-banner-content">
                            <h2 className="questions-banner-title">Still have questions ?</h2>
                            <span className="questions-banner-description">Request a call and our managers will contact you as soon as possible!</span>
                            <div className="call-me-wrapper">
                                <input type="tel" className="banner-input-phone" placeholder="+38 (___) ___-__-__" />
                                <button type="submit" className="banner-call-me-btn"></button>
                            </div>
                            <span>By clicking on the button you agree to the terms of the site</span>
                            <button className="call-me-btn">Request a call back</button>
                        </div>
                    </div>
                    <div className="accordion-FAQ-wrapper">{renderQuestions()}</div></>}
              

                

                </div>

                
         
</article>
       
        
    )
}

