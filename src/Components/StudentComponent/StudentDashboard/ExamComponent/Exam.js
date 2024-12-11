import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import style from "../StudentDashboard.module.css";

function Exam() {
    let { category } = useParams();
    const [allExam, setAllExam] = useState([]);

    useEffect(() => {
        async function getAllExams() {
            let value = await axios.get("http://localhost:3333/Exam");
            setAllExam(value.data);
        }
        getAllExams();
    }, []);

    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>All {category} Exam</h1>
            </div>
            {allExam.map((data, i) => {
                if (data.exam_name === category)
                    return (
                        <div
                            key={i}
                            className={
                                data.exam_name === "Maths"
                                    ? `${style.googleFormStyle}`
                                    : `${style.displayBoxExamBox}`
                            }
                        >
                            <div className={style.formHeader || ""}>
                                <span>{data.exam_name}</span>
                            </div>
                            <div className={`${style.formField || ""}`}>
                                <label>Exam ID:</label>
                                <span>{data.id}</span>
                            </div>
                            <div className={`${style.formField || ""}`}>
                                <label>Exam Description:</label>
                                <span>{data.exam_desc}</span>
                            </div>
                            <div className={`${style.formField || ""}`}>
                                <label>Pass Marks:</label>
                                <span>{data.exam_passMarks}</span>
                            </div>
                            <div className={`${style.formField || ""}`}>
                                <label>Total Marks:</label>
                                <span>{data.exam_marks}</span>
                            </div>
                            <div className={`${style.formFooter || ""}`}>
                                <NavLink exact to={`/StudentDashboard/Exam/${category}/${data.id}`}>
                                    <button>Go to Exam</button>
                                </NavLink>
                            </div>
                        </div>
                    );

                return <React.Fragment key={i}></React.Fragment>;
            })}
        </>
    );
}

export default Exam;
