require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const axios = require("axios");

let newSMS = true;

// test txt
txt();

setInterval(ping, 60000);

async function ping() {
  try {
    const { status } = await axios.get(process.env.URL);
    if (status !== 200 && newSMS) {
      txt();
    }

    if (status == 200) {
      newSMS = true;
    }
  } catch (error) {
    console.log(error);
  }
}

function txt() {
  client.messages
    .create({
      body: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
      from: process.env.FROM_NUMBER,
      to: process.env.TO_NUMBER,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

  newSMS = false;
}
