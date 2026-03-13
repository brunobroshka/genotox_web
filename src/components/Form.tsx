import { CiKeyboard } from "react-icons/ci";
import Loader from "./Loader";
import useGenotoxQuery from "../hooks/useGenotoxQuery";
import { Result } from "../interfacesAndTypes";

type formDataQueryProps = {
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  handleSubmittedCasNum: (casNum: string) => void;
};

function Form(props: formDataQueryProps) {
  const { isLoading, executeQuery } = useGenotoxQuery(
    props.setResult,
    props.handleSubmittedCasNum,
  );

  const submit = async (formData) => {
    const casNum: string = formData.get("cas-number");
    const showDetails: string = formData.get("show-details") == null ? "false" : "true";
    executeQuery(casNum, showDetails);
  };

  return (
    <>
    
        <div className="flex flex-wrap items-center gap-2 group">
          <CiKeyboard
            className="text-gray-400 hidden md:visible transition-colors ease-out duration-300 group-hover:text-gray-600 "
            size={25}
          />
          <form className="flex gap-3" action={submit}>
            <input
              name="cas-number"
              type="text"
              className="border-2 border-gray-300 placeholder:text-xs md:placeholder:text-base transition-all duration-300 w-40 md:w-auto ease-in-out focus:border-gray-500 focus:outline-none rounded-md px-2 py-1"
              placeholder="Introduce a CAS Number"
            />
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-2 p-2.5 border rounded-md md:text-base text-sm m-auto shadow-md text-neutral-500  items-center">
                <input
                  value="true"
                  type="checkbox"
                  className="scale-150 accent-green-600"
                  name="show-details"
                  id="show-details"
                  title="show all details"
                />
                <span className="text-xs text-neutral-600">
                  Show all details
                </span>
              </div>

              <button
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }   md:text-sm text-xs m-auto md:m-0 transform hover:-translate-y-1 active:-translate-y-0 rounded-md border p-1 shadow-md px-12 text-neutral-500 transition-all ease-in-out duration-300 hover:bg-gray-100 hover:text-green-900 font-semibold`}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
     
  
      {isLoading && <Loader />}
    </>
  );
}

export default Form;
