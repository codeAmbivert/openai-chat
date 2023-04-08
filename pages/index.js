import Navabar from "@/comps/Navbar";
import { useEffect } from "react";

export default function Home() {
  const { Configuration, OpenAIApi } = require("openai");
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: "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",
    })
  );

  let input;
  let sendMessage;

  // const sendMessage;
  useEffect(() => {
    let input = document.getElementById("inputMessage");
    sendMessage = document.getElementById("inputMessage");
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
        const newInputValue = input.value;
        input.value = "";
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: newInputValue,
          max_tokens: 500,
        });

        // console.log(response.data.choices[0].message.content);
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

  // sendMessage = async () => {
  //   // e.preventDefault();

  // };

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
