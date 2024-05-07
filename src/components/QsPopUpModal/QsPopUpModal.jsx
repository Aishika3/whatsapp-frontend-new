import React, { useState } from 'react';
import './styles.css';
import Cancel from "@iconscout/react-unicons/icons/uil-cancel";

export const QsPopUpModal = (props) => {
      const [message, setMessage] = useState("");
      const [option, setOption] = useState("");
    
      const handleMessage = (event) => {
        setMessage(event.target.value);
      };

      const handleOption = (event) => {
        setOption(event.target.value);
      }


      const handleSubmit = (e) => {
        if (message !== null && (option !== null || props.parentId === props.uniqueRootId)) {
            props.handleAddNode(props.parentId, message, option);
            props.handleQuestionForm();
        }
      }

	return (
        <>
            <div class='backdrop'>
                
                <div className="popup">
                <div style={{ display: "flex", alignSelf: "flex-end",position: "fixed", top: 0, right: 0 }}>
                <Cancel
                color="#7d796f"
                size="2rem"
                onClick={props.handleQuestionForm}
                className="cancel"
                />
                </div>
                    {props.parentId !== props.uniqueRootId ? (
                        <>
                        <label >Enter the option for the next message:</label>
                        <input type="text" name={message} onChange={handleOption} className='input'/>
                        </>
                    ) : null}
                    <br/>
                    <label>Enter the next message for this option:</label>
                    <input type="email" name={option} onChange={handleMessage} className='input'/>
                    <br/>
                    <button onClick={handleSubmit} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">Submit</button>
                </div>
            </div>
        </>
	);
}

export default QsPopUpModal;