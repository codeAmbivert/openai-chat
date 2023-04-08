import Navabar from "@/comps/Navbar";
import { useEffect } from "react";

export default function Home() {
  const { Configuration, OpenAIApi } = require("openai");
  const openai = new OpenAIApi(
    new Configuration({
      //This API key will not work. To get a working version 
      // go to https://platform.openai.com/account/api-keys to get your own
      apiKey: "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"
    })
  );

  useEffect(() => {
    let input = document.getElementById("inputMessage");
    const sendMessage = document.getElementById("inputMessage");
    input.focus();

    const sendMessages = async () => {
      if (input.value !== "") {
        const chatContainer = document.getElementById("chat_container");

        // create user and AI chat div
        const userDiv = document.createElement("div");
        const aiDiv = document.createElement("div");

        // give user and AI div classes
        userDiv.classList.add("user");
        aiDiv.classList.add("ai");

        const userDivContent = document.createTextNode(input.value);

        userDiv.appendChild(userDivContent);
        chatContainer.appendChild(userDiv);
        
        // this variable allows you to save the input value before clearing the input field
        const newInputValue = input.value;
        input.value = "";
        
        //request a response from openai api
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: newInputValue,
          max_tokens: 500,
        });

        const aiDivContent = document.createTextNode(
          response.data.choices[0].text
        );
        aiDiv.appendChild(aiDivContent);
        chatContainer.appendChild(aiDiv);
      }
    };
    
    sendMessage.addEventListener("click", sendMessages);
    input.addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessages();
      }
    });
  });

  return (
    <div className="home">
      <Navabar />
      <div className="main__chat_container">
        <div id="chat_container"></div>

        <div className="inputDiv">
          <input
            type="text"
            id="inputMessage"
            className="input"
            autoFocus={true}
          />
          <button type="button" id="inputBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
