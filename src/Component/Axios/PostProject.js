import React, { useState, useEffect } from "react";
import axios from "axios";
import { StartProStep4 } from "../../Page/StartProject/StartProStep4";

export function PostProject(props) {
    const thisProjecName = props.projectName;
    const thisProjectCategoryId = props.projectCategoryId


    return {
        thisProjecName,
        thisProjectCategoryId
    }
}