"use client";
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillMail, AiOutlineFieldTime } from "react-icons/ai";
import { FaHeadphones } from "react-icons/fa";
import { Hind } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import translations from '../../translations.json'; // Importar el archivo de traducciones
import { useLanguage } from '../../Context/LanguageContext'; // Importar el hook de idioma

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export default function Page() {
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { language, setLanguage } = useLanguage(); // Usar el idioma global del contexto

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [key]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setState({ ...state, phoneNumber: numericValue });
  };

  const clearState = () => {
    setState({
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      ...state,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setLoading(false);
        const response = await res.json();
        if (!response.error) {
          clearState();
          toast(response.message);
        } else {
          clearState();
          toast("something went wrong");
        }
      })
      .catch((e) => {
        setLoading(false);
        clearState();
        toast("something went wrong");
      });
  };

  const [isLoadedTitle, setIsLoadedTitle] = useState(false);
  const [isLoadedSubTitle, setIsLoadedSubTitle] = useState(false);
  const [isLoadedTextDesc, setIsLoadedTextDesc] = useState(false);
  const [isLoadedCards, setIsLoadedCards] = useState(false);
  const [isLoadedPic, setIsLoadedPic] = useState(false);
  const [isLoadedForm, setIsLoadedForm] = useState(false);
 

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedTitle(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedSubTitle(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedTextDesc(true);
    }, 1200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedCards(true);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedPic(true);
    }, 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadedForm(true);
    }, 2600);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="bg-gradient-dark-contact w-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full pt-[80px] pb-[80px] mt-4">
          <div className='flex flex-col items-center justify-center bg-[url("/contactme.webp")] bg-cover bg-center w-full h-[400px]'>
            <div className="flex flex-col items-center justify-center w-full h-full bg-[#00bcd4]/20 backdrop-brightness-50">
              <div
                className={`fade-in ${
                  isLoadedTitle ? "active" : ""
                } text-center bg-[#00bcd4] py-[5px] px-[10px] tracking-wide uppercase font-semibold text-[20px] rounded-lg `}
              >
                <a href="#contact" className="cursor-pointer">
                   {translations[language].hireme.contactFormTitle}
                </a>
              </div>
              <div
                className={`fade-in ${
                  isLoadedSubTitle ? "active" : ""
                } mt-[10px]`}
              >
                <h1 className="recoletaBold text-5xl text-[#00bcd4] p-2 text-center tracking-wide">
                    {translations[language].hireme.hireMeTitle}
                </h1>
              </div>
              <div
                className={`fade-in ${
                  isLoadedTextDesc ? "active" : ""
                } flex justify-center text-center mt-[10px] md:w-[700px]`}
              >
                <p
                  className="text-[#e7ff31] font-[300] text-center text-xl"
                  style={{
                    WebkitTextStrokeWidth: "0.5px",
                    WebkitTextStrokeColor: "white",
                  }}
                >
                    {translations[language].hireme.description}
                </p>
              </div>
            </div>
          </div>

          <div className={`fade-in ${isLoadedCards ? "active" : ""} px-[20px]`}>
            <div className="sm:flex flex-wrap gap-[20px] mt-[50px] max-w-[1105px] w-full h-full">
              <div className="flex flex-col flex-1 xl:flex-row gap-[20px]">
                <div
                  className="flex flex-col py-[35px] px-[45px] rounded-lg shadow-lg cursor-pointer transition-all transform duration-300 hover:bg-[#223740] hover:text-white hover:-translate-y-4 bg-white"
                  style={{ boxShadow: "#48AFDE -1px 1px 10px 0px" }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div>
                      <FaLocationDot size={40} color="#48AFDE" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-[#48AFDE] text-[14px]">
                        <p> {translations[language].hireme.locationTitle}</p>
                      </div>
                      <div className="font-semibold text-[20px] tracking-wide">
                        <p> {translations[language].hireme.visitMeAt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <p className="text-[#666666] text-sm">
                    {translations[language].hireme.location}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col py-[35px] px-[45px] rounded-lg shadow-lg cursor-pointer transition-all transform duration-300 hover:bg-[#223740] hover:text-white hover:-translate-y-4 bg-white"
                  style={{ boxShadow: "#48AFDE -1px 1px 10px 0px" }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div>
                      <FiPhoneCall size={40} color="#48AFDE" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-[#48AFDE] text-[14px]">
                        <p>{translations[language].hireme.serviceTitle}</p>
                      </div>
                      <div className="font-semibold text-[20px] tracking-wide">
                        <p>{translations[language].hireme.callMeOn}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-[#666666] text-sm">{translations[language].hireme.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 xl:flex-row gap-[20px] mt-4 sm:mt-0">
                <div
                  className="flex flex-col py-[35px] px-[45px] rounded-lg shadow-lg cursor-pointer transition-all transform duration-300 hover:bg-[#223740] hover:text-white hover:-translate-y-4 bg-white"
                  style={{ boxShadow: "#48AFDE -1px 1px 10px 0px" }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div>
                      <AiFillMail size={40} color="#48AFDE" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-[#48AFDE] text-[14px]">
                        <p>{translations[language].hireme.dropALine}</p>
                      </div>
                      <div className="font-semibold text-[20px] tracking-wide">
                        <p>{translations[language].hireme.mailAdressTitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <p className="text-[#666666] text-sm">
                    {translations[language].hireme.email}
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col py-[35px] px-[45px] rounded-lg shadow-lg cursor-pointer transition-all transform duration-300 hover:bg-[#223740] hover:text-white hover:-translate-y-4 bg-white"
                  style={{ boxShadow: "#48AFDE -1px 1px 10px 0px" }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div>
                      <AiOutlineFieldTime size={40} color="#48AFDE" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-[#48AFDE] text-[14px]">
                        <p>{translations[language].hireme.officeHoursTitle}</p>
                      </div>
                      <div className="font-semibold text-[20px] tracking-wide">
                        <p>{translations[language].hireme.openingTimeTitle}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#666666] text-sm">
                    {translations[language].hireme.openingTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#666666] text-sm">{translations[language].hireme.sundayClosed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="contact"
          className="flex flex-col xl:flex-row justify-center gap-[60px] mt-[10px] px-[30px] max-w-[1105px] m-auto p-10 mb-[100px]"
        >
          <div
            className={`fade-in ${
              isLoadedPic ? "active" : ""
            } hidden md:block relative w-[50%] xl:w-[50%] h-[550px] rounded-xl md:w-full lg:w-[50%] bg-center bg-cover`}
            style={{ backgroundImage: `url('/customer-care.png')` }}
          >
            <div className="absolute h-full w-full bg-gradient-to-t from-[#223740] via-[#223740] shadow-inner opacity-70"></div>
            <div className="absolute inset-0 flex flex-col gap-[20px] items-center justify-center text-white shadow-lg p-6">
              <div className="text-4xl xl:mt-[150px] mt-0 rounded-full px-[15px] py-[15px] bg-[#48AFDE] text-white">
                <FaHeadphones />
              </div>
              <div className="font-semibold text-[24px]">{translations[language].hireme.chatWithLiveTitle}</div>
              <div>
                <p className="text-center mt-5 font-[200] text-xl">
                {translations[language].hireme.chatDescription}
                </p>
              </div>
              <div>
                <button className="bg-[#48AFDE] text-white mb-[30px] px-4 py-2 hover:bg-[#223740] transition-color rounded-xl">
                {translations[language].hireme.letsChatButton}
                </button>
              </div>
            </div>
          </div>
          <div
            className={` fade-in ${
              isLoadedForm ? "active" : ""
            } flex flex-col gap-[20px]`}
          >
            <div className="text-center w-[100px] bg-red-500 py-[1px] tracking-wide uppercase font-300 font-sans text-[14px] text-white rounded-lg">
            {translations[language].hireme.contact_me_button}
            </div>
            <div className="">
              <p className="text-[30px] text-[#48AFDE]">
              {translations[language].hireme.request_call_back}
              </p>
            </div>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
              <div
                className={`flex flex-col sm:flex-row gap-[20px] ${hind.className}`}
              >
                <input
                  type="text"
                  name="name"
                  placeholder={translations[language].hireme.form_name_placeholder}
                  required
                  onChange={handleChange}
                  value={state.name}
                  className="px-[12px] outline-none rounded-md py-[12px] flex-1 bg-gray-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={translations[language].hireme.form_email_placeholder}
                  required
                  onChange={handleChange}
                  value={state.email}
                  className="px-[12px] outline-none rounded-md py-[12px] flex-1 bg-gray-200"
                />
              </div>
              <div
                className={`flex flex-col sm:flex-row gap-[20px] ${hind.className}`}
              >
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder={translations[language].hireme.form_phone_placeholder}
                  required
                  onChange={handlePhoneChange}
                  value={state.phoneNumber}
                  className="px-[12px] outline-none rounded-md py-[12px] flex-1 bg-gray-200"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder={translations[language].hireme.form_subject_placeholder}
                  required
                  onChange={handleChange}
                  value={state.subject}
                  className="px-[12px] outline-none rounded-md py-[12px] flex-1 bg-gray-200"
                />
              </div>
              <div className={`${hind.className}`}>
                <textarea
                  required
                  name="message"
                  placeholder={translations[language].hireme.form_message_placeholder}
                  onChange={handleChange}
                  value={state.message}
                  className="px-[12px] outline-none h-[180px] w-full rounded-md py-[12px] flex-1 bg-gray-200"
                />
              </div>
              <div>
                {loading && (
                  <div className="mb-3 text-center ml-5 w-6 h-6 border-t-2 border-blue-600 border-solid animate-spin rounded-full"></div>
                )}
                <button className="bg-[#48AFDE] w-full sm:w-auto px-[30px] py-[12px] hover:bg-[#223740] transition-colors duration-300 font-semibold rounded-lg text-white">
                {translations[language].hireme.form_submit_button}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
