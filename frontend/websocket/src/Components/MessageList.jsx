function MessageList({ messages }) {
  return (
    <div className="messages" role="log" aria-live="polite">
      {messages.length === 0 ? (
        <p className="message-empty">No messages yet. Say hello below.</p>
      ) : (
        messages.map((msg, i) => (
          <div key={i} className="message">
            <b>{msg.sender}:</b> {msg.content}
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;