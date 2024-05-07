import React, { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PopUpModal from '../PopUpModal/PopUpModal'
import QuestionForm from '../QsPopUpModal/QsPopUpModal';
import {app,auth,db} from '../../firebase';
import { ref, set } from 'firebase/database';
import './CoversationFlow.css';
import axios from 'axios';


const uniqueRootId = 'root_' + uuidv4();

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const compute = async (userId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/user/get/${userId}`);
    const data = await response.json();

    if (data.jsonData) {
      console.log(data.jsonData);
      return data.jsonData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export const ConversationFlowForm = ({userId}) => {
  const [popup, setPopup] = useState(false);
  const [questionform, setQuestionform] = useState(false);
  const [popupmessage, setPopupmessage] = useState("");
  const [parentid, setParentid] = useState("");
  const [initialJson, setInitialJson] = useState({
    [uniqueRootId]: {
      id: uniqueRootId,
      message: '',
      options: [],
      parent: null,
      depth: 0
    },
  });

  const handlePopup = () => {
    setPopup(!popup);
  }

  const handleQuestionForm = () => {
    setQuestionform(!questionform);
  }

  useEffect(() => {
    const fetchData = async () => {
      const computedJson = await compute(userId);
  
      if (computedJson) {
        console.log("before update: ", initialJson);
        setInitialJson(JSON.parse(computedJson));
      }
    };
    fetchData();
  }, [userId]);
  
  useEffect(() => {
    console.log("after update: ", initialJson);
  }, [initialJson]);
  
  const [json, setJson] = useState(initialJson);

  useEffect(() => {
    setJson(initialJson);
  }, [initialJson]);


  const handleReset = () => {
    setJson(initialJson);
  };

  const countNodes = () => {
    return Object.keys(json).length;
  };

  const createNodeTemplate = (parentId = null, message = '',parent_depth) => ({
    id: uuidv4(),
    message: message,
    options: [],
    parent: parentId,
    depth: parent_depth+1
  });

  const handleAddNode = (parentId=uniqueRootId,message="",option="") => {
    if (json[parentId].options.length >= 4){
      
      return;
    }

    if (countNodes() >= 64) {
      handlePopup();
      setPopupmessage("Sorry, no more than 64 nodes allowed!");
      return;
    }

    const depth = json[parentId].depth
    if (depth >= 5){
      handlePopup();
      setPopupmessage("Sorry, not more than 10 messages allowed in a single thread!");
      return;
    }
    
    const newNode = createNodeTemplate(parentId, message, depth);
    const updatedJson = { ...json, [newNode.id]: newNode };

    const parentNode = updatedJson[parentId];
    parentNode.options.push({id: newNode.id, option});
    updatedJson[parentId] = parentNode;

    setJson(updatedJson);
  };

  const handleAddChildNode = (parentId) => {
    let option = null;
    if (parentId === uniqueRootId && json[parentId].options.length > 0){
      handlePopup();
      setPopupmessage("Sorry you can't send two messages for user initiated messages!");
      return;
    }
    
    setParentid(parentId);
    handleQuestionForm();
      // option = prompt('Enter the option to go to the nested question:');
    
    // const message = prompt('Enter the nested question:');
    
    // if (message !== null && (option !== null || parentId === uniqueRootId)) {
    //   handleAddNode(parentId, message, option);
    // }
  };

  const handleEditMessage = (nodeId) => {
    const currentNode = json[nodeId];
    const message = prompt('Edit the message:', currentNode.message);

    if (message !== null) {
      const updatedNode = { ...currentNode, message };
      setJson({ ...json, [nodeId]: updatedNode });
    }
  };

  const handleDeleteMessage = (nodeId) => {
    const updatedJson = { ...json };
    const parentNodeId = updatedJson[nodeId].parent;
    
    updatedJson[parentNodeId].options = updatedJson[parentNodeId].options.filter(option => option.id !== nodeId);
    delete updatedJson[nodeId];

    setJson(updatedJson);
  };

  const renderNode = (nodeId) => {
    const node = json[nodeId];
    console.log(node);
    
    const childNodes = (node && node.options.length>0) ? node.options.map(option => (
      <>
        <p>{option.option}</p>
        <div className="connector"></div>
        {renderNode(option.id)}
      </>
    )) : <p>No options created yet</p>;
    const isRootNode = nodeId === uniqueRootId;
  
    return (
      <div
        key={node.id}
        className={`node depth-${node.depth}`}
      >
        <div>
          <p>{isRootNode ? 'Start Conversation' : node.message}</p>
          <button onClick={() => handleAddChildNode(node.id)} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">
            {isRootNode ? 'Add the first message' : '+'}
          </button>
          {!isRootNode && (
            <>
              <button onClick={() => handleEditMessage(node.id)} style={{ marginLeft: '30px' }} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">
                Edit message
              </button>
              <button onClick={() => handleDeleteMessage(node.id)} style={{ marginLeft: '30px' }} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">
                Delete message
              </button>
            </>
          )}
        </div>
        <div className="nested border-2 border-PrimaryCyan m-base">{childNodes}</div>
      </div>
    );
  };

  const handleSubmit = async () => {
      if (auth.currentUser) {
          const postUserConvoReqDTO = {
              userid: auth.currentUser.uid,
              phone: auth.currentUser.phoneNumber,
              questions: JSON.stringify(json),
              payment_status: 0,
          };

          try {
              const response = await axios.post(
                 `${BASE_API_URL}/user/post`, 
                  postUserConvoReqDTO
              );
              console.log(response.data);
          } catch (error) {
              console.error('Error posting conversation', error);
              handlePopup();
              setPopupmessage("Sorry, failed to post your form!");
          }
      }
  };

  return (
    <div>
      {popup ? <PopUpModal message={popupmessage} popup={popup} setPopup={setPopup} handlePopup={handlePopup}></PopUpModal> : null}
      {questionform ? <QuestionForm questionform={questionform} setQuestionform={setQuestionform} handleAddNode={handleAddNode} parentId={parentid} uniqueRootId={uniqueRootId} handleQuestionForm={handleQuestionForm}></QuestionForm> : null}
      <div className="conversation-flow-builder">
        <div class="background" style={{backgroundImage: `url('https://drive.google.com/uc?id=1uuBrMvnPyWKur9zqw1H39PveNySY5COx')`}}>
        <h1 class="text" style={{color: "#646b51" ,backgroundColor:'#f0fad7' }}>Build Your Interactive Whatsapp Conversation</h1>
        <div>
          {Object.keys(json)
            .filter((nodeId) => json[nodeId].parent === null)
            .map(renderNode)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={handleReset} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">Reset conversation</button>
          <button onClick={handleSubmit} class="bg-PrimaryCyan hover:bg-PrimaryCyan text-White font-semibold hover:text-white py-2 px-4 border-2 border-PrimaryCyan hover:border-transparent rounded">Save Form</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConversationFlowForm;