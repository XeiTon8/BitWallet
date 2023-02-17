import React from 'react'
import "./Faq.scss"

export const FaqQuestion = ({question, answer}) => {
    const [isActive, setIsActive] = React.useState(false);
return (

    <div className="question-first">
<button data-testid="accordion-btn" className="accordion" onClick={() => setIsActive(!isActive)}>
    <span className="question-btn-content">
       {question}
    </span>
</button>
               
                       {isActive ? <div  data-testid="accordion-panel" className="panel">
                       
                       <p>{answer}</p>
               
                       </div> : null}
</div>
)

}