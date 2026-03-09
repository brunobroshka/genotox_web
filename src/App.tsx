import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import { useState } from "react";
import Footer from "./components/Footer";
import ButtonDownloadData from "./components/ButtonDownloadData";
import ResultDashboard from "./components/ResultDashboard";

function App() {
  const [result, setResult] = useState<object | boolean>(false);
  const [submittedCas, setSubmittedCas] = useState<string>("");

  const handleSubmittedCasNum = (casNum: string) => {
    setSubmittedCas(casNum);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,#fff_0%,#fff_40%,#064e3b_100%)] flex flex-col">
        <Header />
        <div className="components  flex flex-col bg-white w-auto transition-all ease-in-out duration-300 shadow-2xl flex-grow m-8 rounded-md">
          <div className="relative group flex flex-col md:flex-row justify-between w-full px-4 py-4 gap-4 items-start bg-neutral-50   rounded-t-md">
            <Form
              setResult={setResult}
              handleSubmittedCasNum={handleSubmittedCasNum}
            />
            <ButtonDownloadData result={result} submittedCas={submittedCas}  />
          </div>
          <ResultDashboard submittedCas={submittedCas} result={result} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
