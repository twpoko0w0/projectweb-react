import React, { useEffect, useState, useReducer } from "react";
import { Container, Nav, Button, Row, Col, Fade, Collapse } from "react-bootstrap";

import Card3data from "./Card/Card3data";
import NavcatITems from "./NavCatitems";
import Dropdown1 from "./Dropdown/DropdownCat";
import styled from "styled-components";
import Combobox from "./Combobox/Bobox";
import FilterIcon from "./logo/filter_list_black_24dp.svg";
import Card3 from "./Card/Card3";
import DataWork from "../data/Working";
import { ProjectItem } from "./ProjectItem";

const ButtonStyle = styled.div`
  .filter {
    width: 96px;
    height: 44px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #dcdcdc;
  }
  .filter_icon {
    font-size: 20px;
    padding: 0px 2px;
    margin-left: 4px;
    float: left;
  }
`;
const Content = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
font-family: 'Roboto', sans-serif;
  .content {
    padding-top: 50px;
  }
`;
const TextStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");
  a.Text_a {
    font-family: "Roboto", sans-serif;
    padding: 8px 16px;
  }
  .box-nav{
    display: flex; 
    justify-content: center;
  }
`;

export default function Navcat({ project, items, setItems, searchTerm, projectTag, setNameTag, nameTag, memberCountSelect, setMemberCountSelect, memberCount }) {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [open, setOpen] = useState(false);
  const [filterCategory, setFitlerCategory] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterMemberCount, setFilterMemberCount] = useState("");
  const [filterTier, setFilterTier] = useState("");



  const filrerItems = (categItem) => {
    const updatedIteams = project.filter((curElem) => {
      return curElem.project_category_name === categItem;
    })
    setItems(updatedIteams);
  }

  function handleCategory(val) {
    setFitlerCategory(val)
  }

  function handleTagFilter(val) {
    setFilterTag(val)
  }

  function handleMemberCount(val) {
    setFilterMemberCount(val)
    // applyFilter(val);
  }

  function handleTier(val) {
    setFilterTier(val)
  }

  function applyFilter() {
    let updateList = project;

    if (filterCategory) {
      if (filterCategory === "All") {
        updateList = project
      } else {
        const filterProject = updateList.filter(x => x.project_category_name === filterCategory)
        updateList = filterProject
      }
    }

    if (filterTag) {
      const filterProject = updateList.filter(x => x.project_tag_name.split(",").indexOf(filterTag) !== -1)
      updateList = filterProject
    }

    if (filterTier) {
      const filterProject = updateList.filter(x => x.project_seriousness_name === filterTier)
      updateList = filterProject
    }

    if (filterMemberCount) {
      switch (filterMemberCount) {
        case "1":
          const count1 = memberCount.filter(x => x.member > 0 && x.member < 3)
          if (count1.length > 0) {
            const filterProject = updateList.filter(x => {
              return count1.some(j => x.id === parseInt(j.project_id))
            })
            updateList = filterProject
          }
          break;
        case "2":
          const count2 = memberCount.filter(x => x.member > 2 && x.member < 6)
          if (count2.length > 0) {
            const filterProject = updateList.filter(x => {
              return count2.some(j => x.id === parseInt(j.project_id))
            })
            updateList = filterProject
          }
          break;
        case "3":
          const count3 = memberCount.filter(x => x.member > 5 && x.member < 11)
          const filterProject = updateList.filter(x => {
            return count3.some(j => x.id === parseInt(j.project_id))
          })
          updateList = filterProject
          break;
        default:
          break;
      }
    }

    setItems(updateList);

  }

  useEffect(() => {
    console.log("UseEffect")
    applyFilter()
  }, [filterMemberCount, filterTier, filterCategory, filterTag])

  function handleFilterMemberCount(count) {
    switch (count) {
      case "1":
        const count1 = memberCount.filter(x => x.member > 0 && x.member < 3)
        if (count1.length > 0) {
          const filterProject = project.filter(x => {
            return count1.some(j => x.id === parseInt(j.project_id))
          })
          setItems(filterProject)
          console.log(filterProject)
        }
        break;
      case "2":
        const count2 = memberCount.filter(x => x.member > 2 && x.member < 6)
        if (count2.length > 0) {
          const filterProject = project.filter(x => {
            return count2.some(j => x.id === parseInt(j.project_id))
          })
          setItems(filterProject)
          console.log(filterProject)
        }
        break;
      case "3":
        const count3 = memberCount.filter(x => x.member > 5 && x.member < 11)
        if (count3.length > 0) {
          const filterProject = project.filter(x => {
            return count3.some(j => x.id === parseInt(j.project_id))
          })
          setItems(filterProject)
          console.log(filterProject)
        }
        break;
      default:
        break;
    }
  }

  const props = {
    project, items, projectTag, setNameTag,
    handleFilterMemberCount, setFitlerCategory, setFilterMemberCount,
    setFilterTier, filrerItems, setItems, filterMemberCount,
    nameTag, searchTerm, memberCount, handleTagFilter, handleMemberCount, handleTier, handleCategory
  }

  return (
    <div className="Grid_NAV">
      <hr />
      <Container fluid="lg" style={{ maxWidth: "1140px" }}>
        <TextStyle>
          <Nav
            className="box-nav"
            defaultActiveKey="/home"
            as="ul"
          >
            <NavcatITems {...props} />

            <div className="collapsible" style={{ alignSelf: "center" }}>
              <ButtonStyle>
                <Button
                  variant="light"
                  className="filter"
                  onClick={() => setOpen(!open)}
                >
                  <img
                    className="filter_icon"
                    src={FilterIcon}
                    alt="FilterIcon"
                  />
                  Filter
                </Button>
              </ButtonStyle>
            </div >
          </Nav>
        </TextStyle>
        <Collapse in={open} >
          <Content >
            <Combobox {...props} />
          </Content>
        </Collapse>
      </Container>
      <hr style={{ marginBottom: "0" }} />
      <Container fluid="lg" style={{ maxWidth: "1140px" }}>
        <Card3 {...props} />
      </Container>

    </div>
  );
}
