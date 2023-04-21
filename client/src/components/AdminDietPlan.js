import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const AdminDietPlan = () => {
    const [selectedDiet, setSelectedDiet] = useState("");
  const [requests, setRequests] = useState([]);
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await axios.get("/viewRequestedDietPlans");
        setRequests(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchDiets = async () => {
      try {
        const result = await axios.get("/diet");
        setDiets(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
    fetchDiets();
  }, []);

    const handleAssignDiet = async (requestId, dietName) => {

    if (dietName===""){
        window.alert('Please select a diet plan to assign!');
        return;
    }
      try {
      const res = await axios.post("/assignDietPlan", {
        requestId: requestId,
        dietPlan: dietName,
      } )

      if(!res) {
        alert("Error. Diet Plan not assigned!");
        }
      else {
        alert("Diet Plan assigned successfully!");
    }
    }catch (err) {
      console.log(err);
    }
    };

    const handleDietChange = (event) => {
        setSelectedDiet(event.target.value);
      };

  return (
    <>
    <AdminNavbar/>
    {/* <div className="grey-page"> */}
    <div className="recipes-container">
      <h1 className="recipes-header">Assign Diet Plan</h1>
      <ul className="recipes-list">
        {requests
          .filter((request) => !request.complete)
          .map((request) => (
            <li key={request._id} className="recipe">
              <h2 className="recipe-name">{request.email}</h2>
              <p className="recipe-ingredients">
                <strong>Age:</strong> {request.age}
              </p>
              <p className="recipe-ingredients">
                <strong>Height:</strong> {request.height}
              </p>
              <p className="recipe-ingredients">
                <strong>Weight:</strong> {request.weight}
              </p>
              <p className="recipe-ingredients">
                <strong>Food preferences:</strong> {request.prefer}
              </p>
              <p className="recipe-ingredients">
                <strong>Food to avoid:</strong> {request.avoid}
              </p>
              <p className="recipe-ingredients">
                <strong>Fitness Goal:</strong> {request.goal}
              </p>
              <div>
                <label htmlFor={`diet-plan-${request._id}`}>
                  Assign Diet Plan:
                </label>
                <select  onChange={handleDietChange} value={selectedDiet}>
                  <option value="">Choose: </option>
                  {diets.map((diet) => (
                    <option key={diet._id} value={diet.name}>
                      {diet.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={(event) =>
                    handleAssignDiet(request._id, selectedDiet, event)
                  }
                >
                  Assign
                </button>
              </div>
            </li>
          ))}
      </ul>
      </div>
    {/* </div> */}
    <Footer/>
    
    </>
  );
};

export default AdminDietPlan;
