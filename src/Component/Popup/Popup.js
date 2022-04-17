import react from "react";
import styledComponents from "styled-components";

const StylePopup = styledComponents.div`
.spinner-container1 {
    background-color: #F9F9F9;
    z-index: 99;
    position: fixed;
    padding: 7px;
    top: 40%;
    left: 49%;
    display: flex;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3) ;
    margin-top: -100px;
    margin-left: -50px;
    border-radius: 0.5rem;
}
.text-success {
    display: flex;
    text-align: center;
    margin: 0px;
}
span{
    margin: 0px;
    padding: 0px;
}
`;

export default function Popup(props) {
    return (
        <StylePopup>
            <div className="spinner-container1 ">
                <h5 className="text-success ">
                    <span class="material-icons-outlined">
                        done
                    </span> ก็อปปี้แล้ว</h5>
            </div>
        </StylePopup>

    )
}