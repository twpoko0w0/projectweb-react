import React, { useState } from 'react'
import styledComponents from 'styled-components';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  ListGroup,
  FloatingLabel,
} from "react-bootstrap";

const StyleCombobox = styledComponents.div`
.dropdown {
    position: relative;
    color: #333;
    cursor: default;
  }
  
  .dropdown .arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: " ";
    display: block;
    height: 0;
    margin-top: 0.3rem;
    position: absolute;
    right: 10px;
    top: 14px;
    width: 0;
  }
  
  .dropdown .arrow.open {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }
  
  .dropdown .selected-value input  {
    line-height: 1.5;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: default;
    outline: none;
    padding: 8px 52px 8px 10px;
    transition: all 200ms ease;
    width: 100%;
  }
 
  
  .dropdown .options {
    display: none;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }
  
  .dropdown .options.open {
    display: block;
  }
  
  .dropdown .option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }
  
  .dropdown .option.selected,
  .dropdown .option:hover {
    background-color: #f2f9fc;
    color: #333;
  }
`;
function DropElem({ tagValidated, tagRel, projectTag, setSelectTagRelId, selectTagRelId, comboTagName, setComboTagName, objectTag, tagName, setTagName, searchTerm, setSearchTerm, handleJoinRequest }) {
  const [open, setOpen] = useState(false);

  console.log(tagName)
  // function tagName(name) {
  //   const 
  // }

  // function TagRelToName(relId) {
  //   const tagId = tagRel.find(x => x.id === relId).project_tag_id
  //   const tagIdToName = projectTag.find(x => x.id === parseInt(tagId)).project_tag_name
  //   return tagIdToName
  // }
  const tagRelElementSelect = objectTag.map(x => {
    return (
      <div className="option" onClick={() => {
        setOpen(false)
        setTagName(x.project_tag_name)
      }}>{x.project_tag_name}</div>
    )
  })

  const tagRelElementType = searchTerm.map(x => {
    return (
      <div className="option" onClick={() => {
        setOpen(false)
        setTagName(x.project_tag_name)
      }}>{x.project_tag_name}</div>
    )
  })
  return (
    <StyleCombobox>
      <div className="dropdown">
        <div className="control"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div >
            <Form.Control type="email" required onChange={(e) => {
              const search = e.target.value;
              setTagName(e.target.value)
              const nameFilter = objectTag.filter((val) => {
                return val.project_tag_name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
              if (search === "") {
                setSearchTerm([]);
                setOpen(false);
              } else {
                setSearchTerm(nameFilter);
                setOpen(true);
              }
            }}
              value={tagName}
              placeholder="...."
              isInvalid={tagValidated}
              hasValidation />
          </div>
          {tagValidated ? null : <div className={`arrow ${open ? "open" : null}`} />}

        </div>

        <div className={`options ${open ? "open" : null}`}>
          {searchTerm.length !== 0 ? tagRelElementType : tagRelElementSelect}{ }
        </div>
      </div>
    </StyleCombobox>

  )
}

export default DropElem