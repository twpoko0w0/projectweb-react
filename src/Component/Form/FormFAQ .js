import React from "react";
import { Button, Form } from "react-bootstrap";
import Img from '../logo/search_black_24dp.svg'

function FormFAQ() {
  return(
      <>
       <div className="Text-FAQ">
           <h5><img src={Img}/>หากมีข้อสงสัยเพิ่มเติม สามารถถามกับเจ้าของได้โดยตรง</h5>
           <Form.Control type="text"></Form.Control>
           <Button className="btn-send">ส่งคำถาม</Button>
       </div>
      </>
  );
}

export default FormFAQ;
