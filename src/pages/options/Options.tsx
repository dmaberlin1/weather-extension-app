import React, { useEffect, useState } from "react";
import { getStoredOptions, LocaleStorageOptions, setStoredOptions } from "@root/utils/storage";
import { cn } from "@root/utils/tools";
import { TempScale } from "@root/utils/api/api";
import ToggleSwitchBtn from "@src/UI/ToggleSwitchBtn";

interface IFormData {
  homeCity: string;
  user: string;
}


const Options: React.FC = () => {
  const [options, setOptions] =
    useState<LocaleStorageOptions | null>(null);
  const formData: IFormData = { homeCity: "", user: "" };
  const [formState, setFormState] = useState<boolean>(false);
  const [sending, setSending] = useState(false);
  const [responseBodyForm, setResponseBodyForm] = useState(formData);
  const [fieldDisabled, setFieldDisabled] = useState(false);
  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  useEffect(() => {
    useEffect(() => {
      if (responseBodyForm.homeCity.trim().length > 0 && responseBodyForm.user.trim().length > 0) {
        setFormState(true);
      }
    }, [responseBodyForm]);


  }, [responseBodyForm]);


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponseBodyForm({ ...responseBodyForm, [name]: value });
  };

  const handleAutoOverlayChange=(hasAutoOverlay:LocaleStorageOptions["hasAutoOverlay"])=>{
    setOptions({
      ...options,
      hasAutoOverlay,
      homeCity: responseBodyForm.homeCity,
      user: responseBodyForm.user,
      tempScale: options?.tempScale as TempScale,
    })
  }

  const handleSubmitOptions = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Form submission happens here

    // Simulate sending with delay
    setSending(true);
    setFieldDisabled(true)
    setTimeout(()=>{
    const updateOptions: LocaleStorageOptions = {
      ...options,
      homeCity: responseBodyForm.homeCity,
      user: responseBodyForm.user,
      tempScale: options?.tempScale as TempScale,
      hasAutoOverlay:options?.hasAutoOverlay as LocaleStorageOptions['hasAutoOverlay']
    };
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
      setSending(false);
      setFieldDisabled(false)
    });
    setResponseBodyForm(formData);
    },1000)
  };

  if (!options) {
    return null;
  }


  return (
    <div className="container text-lime-400 bg-lime-50">
      <h1 className="text-5xl font-extrabold dark:text-white">Weather extension<small
        className="ml-2 font-semibold text-gray-500 dark:text-gray-400">options page</small>
      </h1>
      <form onSubmit={handleSubmitOptions}>
        <div className="relative z-0 w-full mb-6 group">
          <input type="text"
                 onChange={(e) => inputChangeHandler(e)}
                 name="homeCity" id="homeCity"
                 disabled={fieldDisabled}
                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label htmlFor="home_city"
                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter a home city
          </label>
        </div>
        <label htmlFor="nickname"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <div className="relative z-0 w-full mb-6 group">
  <span
    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  </span>
          <input type="text"
                 onChange={(e) => inputChangeHandler(e)}
                 name="user"
                 id="user"
                 disabled={fieldDisabled}
                 className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 bg-transparent dark:focus:border-blue-500"
                 placeholder="username" />
        </div>
        <ToggleSwitchBtn checked={options.hasAutoOverlay}
                         disabled={fieldDisabled}
                         onChange={handleAutoOverlayChange}>
          Auto toggle overlay on webpage load
        </ToggleSwitchBtn>



        {!sending &&
          <button type="submit" disabled={formState}
                  className={cn("text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
                    { "bg-transparent": formData })}
          >
            save
          </button>}

        {sending && <button disabled type="button"
                            className="font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2text-gray-900 bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
          <svg aria-hidden="true" role="status"
               className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"
               fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2" />
          </svg>
         send...
        </button>}
      </form>
    </div>
  );
};

export default Options;
