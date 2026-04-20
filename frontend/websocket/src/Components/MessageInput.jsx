import { useState } from "react";

function MessageInput({ sendMessage, disabled }) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    sendMessage(trimmed);
    setText("");
  };

  return (
    <div className="input-area">
      <input
        value={text}
        placeholder={disabled ? "Connect to server first…" : "Type a message…"}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />
      <button type="button" onClick={submit} disabled={disabled}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;