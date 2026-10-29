import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000/users";

async function testSurvey() {
  // Sample survey answers
  const surveyData = {
    answers: {
      q1: "Yes",
      q2: "No",
      q3: 4
    }
  };

  try {
    // Send POST request
    const postRes = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(surveyData)
    });
    const postResult = await postRes.json();
    console.log("POST result:", postResult);

    // Send GET request
    const getRes = await fetch(BASE_URL);
    const getResult = await getRes.json();
    console.log("GET all surveys:", getResult);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testSurvey();
