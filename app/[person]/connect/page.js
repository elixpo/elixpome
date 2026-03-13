"use client";

import { useEffect, useState } from "react";

export default function ConnectPage({ params }) {
  const [connectData, setConnectData] = useState(null);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    async function load() {
      const resolvedParams = await params;
      setPerson(resolvedParams.person);
      const res = await fetch(`/api/content/${resolvedParams.person}/connect`);
      const data = await res.json();
      setConnectData(data);
    }
    load();
  }, [params]);

  if (!connectData) return null;

  return (
    <>
      {/* Header */}
      <section className="flex flex-col items-center justify-center mt-10 mb-10">
        <div className="text-[10em] w-full max-w-[900px] h-[200px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
          <p className="text-[#E2D9C8] font-extrabold scale-y-[1.2]">{connectData.heading}</p>
        </div>
        <p className="mt-6 text-[2em] text-[#1B1B19] text-center max-w-[900px]">
          {connectData.description}
        </p>
      </section>

      {/* Social Links */}
      <section className="flex flex-row justify-center items-center gap-16 mt-10 mb-16">
        {connectData.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-[#1B1B19] rounded-full p-6 hover:opacity-80 transition-all duration-300">
              <span className="text-[4em] text-[#E2D9C8]">{social.platform}</span>
            </div>
            <span className="mt-2 text-[#1B1B19] text-[1.2em] font-bold">{social.platform}</span>
          </a>
        ))}
      </section>

      {/* Contact Form */}
      <section className="flex flex-col lg:flex-row items-center mt-10 px-4 justify-between gap-10">
        <div className="relative w-full max-w-[500px] rounded-[20px] p-6 bg-[#e6ddc6] shadow-[inset_8px_8px_20px_#c8c1ae,inset_-8px_-8px_20px_#fef9ef] opacity-95">
          <div className="relative z-10">
            <h2 className="text-[#1B1B19] text-[2em] font-extrabold mb-4 text-center tracking-wider">
              {connectData.formTitle}
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-[#1B1B19] text-[1em] mb-1">
                  What shall I call you as?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 rounded-[10px] bg-[#f8f1de] text-[#1B1B19] border border-[#d1c3a3] shadow-inner outline-none focus:border-[#ffc300] transition-all placeholder:text-[#222]"
                  placeholder="Your name please"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#1B1B19] text-[1em] mb-1">
                  Your Email Please!
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 rounded-[10px] bg-[#f8f1de] text-[#1B1B19] border border-[#d1c3a3] shadow-inner outline-none focus:border-[#ffc300] transition-all"
                  placeholder="Your email please"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#1B1B19] text-[1em] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  className="w-full p-3 rounded-[12px] border border-[#d1c3a3] bg-[#f8f1de] text-[#1B1B19] shadow-inner resize-none outline-none focus:border-[#ffc300] transition-all"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-[#E2D9C8] text-[#1B1B19] text-[1.1em] font-extrabold py-3 rounded-[12px] hover:bg-[#ffc300] transition-all shadow-md"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <span className="inline-block bg-[#1B1B19] max-w-[250px] text-[#E2D9C8] text-center text-[2em] font-extrabold px-4 py-1 rounded-[10px] tracking-wide opacity-90">
          {connectData.emailPrompt}
        </span>
        <div
          className="relative h-[450px] w-[450px] bg-cover bg-center rounded-[12px] opacity-55 mix-blend-darken border-2 border-[#222]"
          style={{ backgroundImage: `url(${connectData.contactImage})` }}
        />
      </section>
    </>
  );
}
