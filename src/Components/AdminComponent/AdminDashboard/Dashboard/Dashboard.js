import style from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [exam, setExam] = useState("Updating...");
  const [question, setQuestion] = useState("Updating...");
  const [user, setUser] = useState("Updating...");

  useEffect(() => {
    async function getAllExam() {
      try {
        let value = await axios.get("http://localhost:3333/exams");
        setExam("We have total " + value.data.length + " exams");
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    }
    getAllExam();

    async function getAllQuestions() {
      try {
        let value = await axios.get("http://localhost:3333/questions");  // Updated endpoint
        setQuestion("We have total " + value.data.length + " questions");
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getAllQuestions();

    async function getAllUsers() {
      try {
        let value = await axios.get("http://localhost:3333/users");  // Updated endpoint
        setUser("We have total " + value.data.length + " users");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getAllUsers();
  }, []);  // Empty dependency array to ensure it runs once when the component mounts

  let history = useHistory();

  function showExam() {
    history.push("/AdminDashboard/Exam");
  }

  function showQuestions() {
    history.push("/AdminDashboard/Question");
  }

  function showUsers() {
    history.push("/AdminDashboard/StudentList");
  }

  return (
    <>
      <div id={style.displayHeadingBox}>
        <h1>Dashboard</h1>
      </div>

      <div id={style.box1}>
        <p id={style.countOfExam}>{exam}</p>
        <button onClick={showExam}>View Details</button>
      </div>

      <div id={style.box2}>
        <p id={style.countOfQuestion}>{question}</p>
        <button onClick={showQuestions}>View Details</button>
      </div>

      <div id={style.box3}>
        <p id={style.countOfUser}>{user}</p>
        <button onClick={showUsers}>View Details</button>
      </div>
    </>
  );
}

export default Dashboard;
