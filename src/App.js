import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      setData([
        { name: "An map chuyen di bao", sentence: "Làm sao để hết báo?" },
        {
          name: "Open AI",
          sentence:
            "Xác định nguyên nhân: Bạn cần xác định xem nguyên nhân của tình trạng báo là gì. Nếu nó do thực phẩm, cảm xúc, hoặc do tập luyện, việc xác định nguyên nhân sẽ giúp bạn tìm ra giải pháp phù hợp.",
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="p-5 mx-auto w-1/2 shadow-9xl rounded-lg h-[90vh] relative">
        <div className="w-[calc(100%-40px)] flex justify-center items-center gap-x-3 mb-5 absolute bottom-0">
          <button className="hover:shadow-8xl transition-all w-[30px] h-[30px] rounded-full">
            icon
          </button>
          <input
            type="text"
            className="border border-green-500 text-black px-3 py-2 rounded-md shadow-lg w-full"
            defaultValue={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={() => console.log("An map")}
            disabled={loading}
            style={{ opacity: loading ? "0.2" : "" }}
            className="px-5 py-1 bg-primary-gradient rounded-md shadow-8xl font-semibold text-white text-lg select-none hover:shadow-none hover:scale-95 transition-all flex-shrink-0"
          >
            Search
          </button>
        </div>
        {loading && (
          <div className="mx-auto w-10 h-10 rounded-full border-4 border-primary animate-spin border-t-transparent border-b-transparent"></div>
        )}
        {!loading && errors && (
          <p className="font-semibold text-xl text-red-500">{errors}</p>
        )}
        {!loading && (
          <div className="flex flex-col gap-3 h-[90%] overflow-auto">
            {!!data &&
              data.length > 0 &&
              data.map((sentence, index) => (
                <Sentence key={index} {...sentence} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const Sentence = ({ name, sentence }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row gap-3 justify-start items-center">
        <p className="w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center border-gray-800 border-[1px]">
          {name.slice(0, 1).toUpperCase()}
        </p>
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <p className="ml-[52px]">{sentence}</p>
    </div>
  );
};
