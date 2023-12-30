import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [sentence, setSentence] = useState([]);
  const [content, setContent] = useState([]);
  const [answer, setAnswer] = useState("");
  const count = useRef(0);
  useEffect(() => {
    if (!content || content.length === 0) return;
    const timer = setInterval(() => {
      if (count.current >= content.length) {
        clearInterval(timer);
        count.current = 0;
        return;
      }
      setAnswer((prev) => prev + content[count.current++]);
    }, 50);
    return () => clearInterval(timer);
  }, [content]);

  const handleSend = async () => {
    if (query === "") return;
    try {
      setLoading(true);
      setSentence((prev) => [
        ...prev,
        {
          role: "user",
          content: query,
        },
      ]);
      const payload = {
        stream: true,
        model: "mistralai/mixtral-8x7b-instruct",
        max_tokens: 300,
        temperature: 0.88,
        top_p: 1,
        messages: [
          ...sentence,
          {
            role: "user",
            content: query,
          },
        ],
      };
      // console.log(query);
      // console.log(sentence);
      console.log(payload);
      const response = await axios.post(
        "http://localhost:8000/api/v1/rpa/open-ai",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const response = await axios.post(
      //   "https://openrouter.ai/api/v1/chat/completions",
      //   JSON.stringify(payload),
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization:
      //         "Bearer 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",
      //     },
      //   }
      // );
      const data = response.data;
      // console.log(data);
      data.split("\n\n").forEach((event) => {
        if (event.startsWith("data:")) {
          try {
            const eventJson = JSON.parse(event.replace("data: ", ""));
            eventJson.choices.forEach((choice) => {
              console.log(choice);
              setContent((prev) => [...prev, choice.delta.content]);
            });
          } catch (error) {
            console.error("Lỗi khi phân tích cú pháp JSON", error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrors(error.message);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  // console.log(content);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="p-5 mx-auto w-1/2 shadow-9xl rounded-lg h-[90vh] relative">
        <div className="w-[calc(100%-40px)] flex justify-center items-center gap-x-3 mb-5 absolute bottom-0">
          <button className="hover:shadow-8xl transition-all w-[30px] h-[30px] rounded-full">
            Chat
          </button>
          <input
            type="text"
            className="border border-green-500 text-black px-3 py-2 rounded-md shadow-lg w-full"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{ opacity: loading ? "0.2" : "" }}
            className="px-5 py-1 bg-gray-800 rounded-md shadow-8xl font-semibold text-white text-lg select-none hover:shadow-none hover:scale-95 transition-all flex-shrink-0"
          >
            Send
          </button>
        </div>
        {loading && (
          <div className="mx-auto w-10 h-10 rounded-full border-4 border-primary animate-spin border-t-transparent border-b-transparent"></div>
        )}
        {!loading && errors && (
          <p className="font-semibold text-xl text-red-500">{errors}</p>
        )}
        <div className="flex flex-col gap-3 h-[10%] overflow-auto">
          {!!sentence &&
            sentence.length > 0 &&
            sentence.map((sentence, index) => (
              <Sentence key={index} {...sentence} />
            ))}
        </div>

        {answer && <Sentence role="Open AI" content={answer} />}
      </div>
    </div>
  );
}

export default App;

const Sentence = ({ role, content }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row gap-3 justify-start items-center">
        <p className="w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center border-gray-800 border-[1px]">
          {role.slice(0, 1).toUpperCase()}
        </p>
        <p className="font-semibold text-lg">{role}</p>
      </div>
      <p className="ml-[52px]">{content}</p>
    </div>
  );
};
