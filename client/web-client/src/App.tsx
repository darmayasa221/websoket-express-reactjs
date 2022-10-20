import React, { ChangeEvent, useEffect, useState } from "react";
import soket from "./websoket/soketIo";

function App() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSendMessage, setSendMessage] = useState<boolean>(false);
  useEffect(() => {
    if (isSendMessage) {
      setSendMessage(false);
      setInputMessage("");
    }
  }, [isSendMessage]);
  const onSendMessage: () => void = (): void => {
    soket.emit("send_message", { message: inputMessage });
    setSendMessage(true);
  };
  const onChangeInputMessage: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMessage(event.target.value);
  };
  return (
    <div className="App">
      <input
        type={"text"}
        placeholder="input text here"
        onChange={onChangeInputMessage}
        value={inputMessage}
        onKeyDown={(e) => {
          e.key === "Enter" && onSendMessage();
        }}
      />
      <button type={"button"} onClick={onSendMessage}>
        send message
      </button>
    </div>
  );
}

export default App;
