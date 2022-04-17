import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";

export default function Combobox({ tag, filrerItems1, projectTag, setNameTag, memberCountSelect,
  setMemberCountSelect, handleFilterMemberCount, setFilterMemberCount, filterMemberCount, handleTagFilter, handleMemberCount, handleTier }) {

  const projectTagElement = projectTag.map((val, index) => {
    return (
      <option key={index} value={val.project_tag_name}>{val.project_tag_name}</option>
    )
  });

  return (
    <>
      <Row style={{ marginTop: "20px" }} >
        <Col>
          <Form.Label>สายงานที่สนใจ</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }}
            onChange={(e) => handleTagFilter(e.target.value)}>
            <option value="">.....</option>
            {projectTagElement}
          </Form.Select>

        </Col>

        <Col>
          <Form.Label>ระดับโปรเจค</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }} onChange={(e) => handleTier(e.target.value)}>
            <option value="">.....</option>
            <option value="ผลงาน">ผลงาน</option>
            <option value="งานอดิเรก">งานอดิเรก</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Label>จำนวนสมาชิก</Form.Label>
          <Form.Select style={{ maxWidth: "400px" }} value={filterMemberCount} onChange={(e) => handleMemberCount(e.target.value)}>
            <option value="">.....</option>
            <option value="1">1-2</option>
            <option value="2">3-5</option>
            <option value="3">5-10</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  );
}
