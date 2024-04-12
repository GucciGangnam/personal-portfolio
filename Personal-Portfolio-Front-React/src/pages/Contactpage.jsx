import { useState } from 'react';
import './Contactpage.css';

export const Contactpage = () => {
    const [formStep, setFormStep] = useState(1);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("")

    const handleMesageChange = (e) => {
        setMessage(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleNextStep = (e) => {
        if (message.length <= 15) {
            return;
        }
        e.preventDefault();
        setFormStep(2)
    }

    const HandleBackBTN = () => {
        setFormStep(formStep - 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message + "," + email)
        // POST REQUEST TO API TO SEND EMAIL 
        // Set local storage item 'message sent" and set it to 'true'
        localStorage.setItem('messageSent', 'true');
        window.location.reload();
    }

    return (
        <div className='ContactPage'>
            {localStorage.getItem('messageSent') ? (
                <div className='MessageSent'>
                    <p>Message sent!</p>
                    <img src='/Outbox.png'></img>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='ContactText'>
                        {formStep === 1 ? `Leave me a message and I'll get back to you.` : `Leave your email address`}
                    </div>
                    {/* step 1 */}
                    <textarea
                        value={message}
                        required
                        minLength={15}
                        onInvalid={(e) => e.target.setCustomValidity(`That all you've got to say?`)}
                        onChange={handleMesageChange}
                        className={formStep === 1 ? 'ContactTextareaShowing' : 'ContactTextarea'}
                    ></textarea>

                    {/* step 2 */}
                    <div className={formStep === 2 ? 'PreferedContactContainerShowing' : 'PreferedContactContainer'}>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={handleEmailChange}
                        ></input>
                    </div>

                    <div className='NextBTNdiv'>
                        <img onClick={HandleBackBTN} className="ContactBackArrow" style={{ display: formStep !== 1 ? 'block' : 'none' }} src='/Back Arrow.png' />
                        {formStep === 1 && (
                            <button onClick={handleNextStep}>
                                Next
                            </button>
                        )}
                        {formStep === 2 && (
                            <button type='submit'>
                                Send
                            </button>
                        )}
                    </div>
                </form>
            )}

        </div>
    )
}
