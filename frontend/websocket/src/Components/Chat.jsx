import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected ✅");
        setConnected(true);

        client.subscribe("/topic/messages", (msg) => {
          const data = JSON.parse(msg.body);
          setMessages((prev) => [...prev, data]);
        });
      },

      onDisconnect: () => setConnected(false),

      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      setConnected(false);
      client.deactivate();
    };
  }, []);

  const sendMessage = (text) => {
    if (!username) {
      alert("Enter username first");
      return;
    }

    if (clientRef.current) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          sender: username,
          content: text,
        }),
      });
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-toolbar">
        <span
          className={`status ${connected ? "status--ok" : "status--pending"}`}
          title={
            connected
              ? "Connected to ws://localhost:8080/ws"
              : "Waiting for server…"
          }
        >
          <span className="status-dot" aria-hidden />
          {connected ? "Live" : "Connecting"}
        </span>
      </div>

      <MessageList messages={messages} />

      <div className="chat-composer">
        <input
          className="username"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="nickname"
          aria-label="Your name"
        />
        <MessageInput sendMessage={sendMessage} disabled={!connected} />
      </div>
    </div>
  );
}

export default Chat;