import { Accordion } from "react-bootstrap"


const Accordion1 = ({ objectTag }) => {

    return (
        <div className="sgaid" style={{ margin: "80px 0px" }}>
            <Accordion defaultActiveKey="0" style={{ maxWidth: "641px", Height: "100%", borderRadius: "12px" }}>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header >
                        <span style={{ padding: "0" }}>Front-end</span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 5 ตำแหน่ง</span>
                    </Accordion.Header>
                    <Accordion.Body >
                        สามารถเขียน HTML, CSS, Java script ได้  Framework หลักที่ใช้เป็น VUE

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span style={{ padding: "0" }}>UX/UI</span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 1 ตำแหน่ง</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <span style={{ padding: "0" }}>Project manager      </span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 3 ตำแหน่ง</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><span style={{ padding: "0" }}>UX Writer</span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 2 ตำแหน่ง</span></Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        <span style={{ padding: "0" }}>Developer Advocate </span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 1 ตำแหน่ง</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>
                        <span style={{ padding: "0" }}>Digital Care </span> {''}
                        <span style={{ padding: "0 20px", color: "#0d6efd" }}> 1 ตำแหน่ง</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )

}

export default Accordion1