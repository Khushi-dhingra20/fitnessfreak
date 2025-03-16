// import React, { useState } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { content: "Hello! What Fitness-related help do you need?", sender: "bot" },
//   ]);
//   const [userInput, setUserInput] = useState("");

//   const addMessage = (content, sender) => {
//     setMessages((prevMessages) => [...prevMessages, { content, sender }]);
//   };

//   const handleSend = async () => {
//     const trimmedInput = userInput.trim();
//     if (!trimmedInput) return;

//     addMessage(trimmedInput, "user");
//     setUserInput("");

//     try {
//       const response = await fetch("http://10.12.111.78:5000/calories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: trimmedInput }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         addMessage(data.response, "bot");
//       } else {
//         addMessage("Error: Received an invalid response from the server.", "bot");
//       }
//     } catch (error) {
//       addMessage("Error: Unable to connect to the chatbot.", "bot");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.messagesContainer}>
//         {messages.map((msg, index) => (
//           <p
//             key={index}
//             style={{
//               ...styles.message,
//               ...(msg.sender === "bot" ? styles.botMessage : styles.userMessage),
//             }}
//           >
//             {msg.content}
//           </p>
//         ))}
//       </div>
//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Type your message..."
//           style={styles.input}
//         />
//         <button onClick={handleSend} style={styles.sendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: "400px",
//     height: "500px",
//     margin: "50px auto",
//     padding: "10px",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     fontFamily: "Arial, sans-serif",
//   },
//   messagesContainer: {
//     flex: 1,
//     overflowY: "auto",
//     marginBottom: "10px",
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//   },
//   message: {
//     margin: "5px 0",
//     padding: "8px",
//     borderRadius: "5px",
//     wordBreak: "break-word",
//   },
//   botMessage: {
//     textAlign: "left",
//     backgroundColor: "#e8eaf6",
//   },
//   userMessage: {
//     textAlign: "right",
//     backgroundColor: "#e1f5fe",
//   },
//   inputContainer: {
//     display: "flex",
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     outline: "none",
//   },
//   sendButton: {
//     marginLeft: "10px",
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     outline: "none",
//   },
// };

// export default Chatbot;
