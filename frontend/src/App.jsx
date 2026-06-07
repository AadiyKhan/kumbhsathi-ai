import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useRef } from "react";

function App() {
const [question, setQuestion] = useState("");
const [messages, setMessages] = useState([]);
const [language, setLanguage] = useState("English");
const [loading, setLoading] = useState(false);
const bottomRef = useRef(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);


  const startVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
  console.log("Listening...");
};

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript:", transcript);
    setQuestion(transcript);
  };

  recognition.onerror = (event) => {
  if (event.error === "network") {
    alert(
      "Voice recognition works best in Google Chrome."
    );
  }
};

  recognition.start();
};

  const askQuestion = async () => {
  if (!question.trim()) return;

  const userQuestion = question;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: userQuestion,
    },
  ]);

  setQuestion("");
  setLoading(true);

  try {
    const response = await axios.post(
      "https://kumbhsathi-ai-production.up.railway.app/chat",
      {
        question: userQuestion,
        language: language,
      }
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: response.data.answer,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Backend connection failed.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};
const askPresetQuestion = async (presetQuestion) => {
  setLoading(true);

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: presetQuestion,
    },
  ]);

  try {
    const response = await axios.post(
      "https://kumbhsathi-ai-production.up.railway.app/chat",
      {
        question: presetQuestion,
        language: language,
      }
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: response.data.answer,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Unable to fetch information.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
  <h1 className="text-4xl font-bold">
    🕉️ KumbhSathi AI
  </h1>

  <p className="mt-2 text-lg">
    Navigation • Emergency Support • Accommodation • Safety Guidance
  </p>
</div>

        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Ask Anything
          </h2>
          <div className="mb-4">
  <label className="block mb-2 font-medium">
    Language
  </label>

  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option>English</option>
    <option>Hindi</option>
    <option>Tamil</option>
    <option>Telugu</option>
    <option>Bengali</option>
  </select>
</div>
<button
  onClick={() => setMessages([])}
  className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg"
>
  Clear Chat
</button>

          <div className="flex gap-3">

  <input
  type="text"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      askQuestion();
    }
  }}
  placeholder="Ask your question..."
  className="flex-1 border p-3 rounded-lg"
/>
  <button
  onClick={startVoiceInput}
  className="bg-gray-700 text-white px-4 rounded-lg"
>
  <FaMicrophone />
</button>

<button
  onClick={askQuestion}
  className="bg-blue-600 text-white px-6 rounded-lg"
>
  Ask
</button>
</div>
<div className="mt-6">

  <h3 className="font-bold mb-3">
    Quick Assistance
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

    <button
      className="bg-red-500 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "Where can I find medical help during Mahakumbh?"
        )
      }
    >
      🚑 Medical Help
    </button>

    <button
      className="bg-blue-500 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "How can I contact police assistance during Mahakumbh?"
        )
      }
    >
      👮 Police Help
    </button>

    <button
      className="bg-yellow-500 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "What should I do if a family member gets lost during Mahakumbh?"
        )
      }
    >
      👨‍👩‍👧 Missing Person
    </button>

    <button
      className="bg-green-600 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "Provide emergency contact information and safety guidance for pilgrims."
        )
      }
    >
      🚨 Emergency Contacts
    </button>

    <button
      className="bg-purple-600 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "How can I find accommodation during Mahakumbh?"
        )
      }
    >
      🏨 Accommodation
    </button>

    <button
      className="bg-orange-500 text-white p-3 rounded-lg"
      onClick={() =>
        askPresetQuestion(
          "How can I navigate important locations during Mahakumbh?"
        )
      }
    >
      📍 Navigation
    </button>

  </div>

</div>
<div className="mt-6 space-y-4">

  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-4 rounded-xl max-w-[80%] ${
        msg.role === "user"
          ? "bg-blue-600 text-white ml-auto"
          : "bg-gray-200 text-black"
      }`}
    >
      {msg.role === "assistant" ? (
        <ReactMarkdown>
          {msg.text}
        </ReactMarkdown>
      ) : (
        msg.text
      )}
    </div>
  ))}

  {loading && (
    <div className="bg-gray-200 p-4 rounded-xl max-w-[80%]">
      Thinking...
    </div>
  )}
        <div ref={bottomRef}></div>

</div>
        </div>
      </div>
    </div>
  );
}


export default App;