import React, {useState} from 'react';
import {api} from '../services/api'


const AccessForm = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const submitPhoneHandler = e => {
        e.preventDefault();
        api.getPhoneNumber(phoneNumber);
        setIsPhoneSubmitted(true);
    }

    const submitCodeHandler = e => {
        e.preventDefault();
        api.validateCode(phoneNumber, accessCode).then(resp => setValidated(resp))
    }

    const handlePhoneChange = e => {
        setPhoneNumber(e.target.value);
    }

    const handleCodeChange = e => {
        setAccessCode(e.target.value);
    }

    return (
        <div>
        { validated ? <h1>Validate Success!</h1> : null }   
        <form onSubmit={submitPhoneHandler}>
            <div>
                <p>Enter your phone number: </p>
                <input type="text" name="phoneNumber" placeholder="Phone number..." value={phoneNumber} onChange={handlePhoneChange}/>
            </div>
        </form>

        { isPhoneSubmitted ?
            <form onSubmit={submitCodeHandler}>
                <div>
                    <p>Enter access code that was sent to your phone: </p>
                    <input type="text" name="accessCode" placeholder="Access code..." value={accessCode} onChange={handleCodeChange}/>
                </div>
            </form>
            :
            null
        }
        </div>
        
    )
}

export default AccessForm;
