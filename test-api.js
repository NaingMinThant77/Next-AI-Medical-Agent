const axios = require("axios");

axios
  .post("http://localhost:3000/api/suggest-doctors", {
    notes: "I have Headache",
  })
  .then((response) => {
    console.log("Success:", response.data);
    console.log("Status:", response.status);
  })
  .catch((error) => {
    console.error("Error:", error.message);
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    }
  });
