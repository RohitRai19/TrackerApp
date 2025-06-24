import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const fetchFromBackend = async () => {
      try {
        setStatus("Calling backend...");
        const res = await axios.post('http://localhost:5000/get-data');
        setData(res.data.data); 
        setStatus("Data loaded");
        console.log("API Data:", res.data.data);
      } catch (err) {
        setStatus("Error: " + err.message);
        console.error(err);
      }
    };

    fetchFromBackend();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Call Records</h1>
      <p>Status: {status}</p>

      {data.length > 0 ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Start Time</th>
              <th>Caller</th>
              <th>Talk Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((call, index) => (
              <tr key={index}>
                <td>{call.callId}</td>
                <td>{new Date(call.startTimeUTC).toLocaleString()}</td>
                <td>{call.callerId}</td>
                <td>{call.talkTime}</td>
                <td>{call.callTime}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No call data available.</p>
      )}
    </div>
  );
}

export default App;
