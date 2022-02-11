import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";

const StyleForm = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
font-family: 'Roboto', sans-serif;
  .form-control.text {
    position: absolute;
  }
`;

export default function Combobox() {
  return (
    <StyleForm>
      <Row style={{ margin: "24px 0px" }}>
        <Col>
          <Form.Label>สายงานที่สนใจ</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }}>
            <option>select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Label>ระดับโปรเจค</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }}>
            <option>select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Label>จำนวนสมาชิก</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }}>
            <option>select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
    </StyleForm>
  );
}
