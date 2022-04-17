import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LogoApp from "./logo/Frame.svg";
import styled from "styled-components";

const Style = styled.div`
  .GridStyle {
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export default function Footer() {
  return (
    <>
      <Style>
        <div
          className="bg-white GridStyle"
          style={{ width: "100%", height: "368px" }}
        >
          <Container style={{ maxWidth: "1140px" }}>
            <Row>
              <Col className="md-4" style={{ paddingTop: "70px" }}>
                <Col className="col-md-3  ">
                  <img style={{ width: "88px" }} src={LogoApp} alt="LogoApp" />
                </Col>
                <Row className="align-items-end " style={{ marginTop: "6rem" }}>
                  <Col style={{ padding: "6px 0" }}>
                    <span style={{ padding: "10px" }}>Term & Conditions</span>
                  </Col>
                  <Col className=" mt-5" style={{ padding: "6px 0" }}>
                    <span style={{ padding: "0" }}>Privacy Policy</span>
                  </Col>
                </Row>
              </Col>
              <Col>
                <h5 style={{ marginTop: "70px" }}>
                  <strong>About</strong>
                </h5>
                <div className="col mb-2 mt-4">
                  <span style={{ padding: "0" }}>เกี่ยวกับเรา</span>
                </div>
                <div className="col mb-2 mt-4">
                  <span style={{ padding: "0" }}>ติดต่อสอบถามเพิ่มเติม</span>
                </div>
                <div className="col mb-2 mt-4">
                  <span style={{ padding: "0" }}>แจ้งปัญหาเกี่ยวกับระบบ</span>
                </div>
              </Col>
              <Col>
                <h5 style={{ marginTop: "70px" }}>
                  <strong>Category</strong>
                </h5>
                <Row>
                  <Col className="md">
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Art</span>
                    </div>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Craft</span>
                    </div>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Film&Video</span>
                    </div>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Games</span>
                    </div>
                  </Col>
                  <Col>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Music</span>
                    </div>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Technology</span>
                    </div>
                    <div className="col mb-2 mt-4">
                      <span style={{ padding: "0" }}>Other</span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </Style>
    </>
  );
}
