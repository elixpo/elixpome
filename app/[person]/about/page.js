import { getPersonContent } from "@/lib/content";
import ContactBanner from "@/components/ContactBanner";

export default async function AboutPage({ params }) {
  const { person } = await params;
  const about = getPersonContent(person, "about");
  const work = getPersonContent(person, "work");
  const spotlight = getPersonContent(person, "spotlight");
  const profile = getPersonContent(person, "profile");

  return (
    <>
      {/* Intro Section */}
      <section className="introSection flex flex-col lg:flex-row items-center gap-10 mt-5">
        <div className="col1 flex flex-col justify-left gap-2 w-full lg:w-1/2">
          <div className="headingText text-[7em] w-[500px] p-5 h-[200px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
            <p className="text-[#E2D9C8] transform scale-y-[1.4] font-extrabold">
              {about.intro.heading}
            </p>
          </div>
          <div className="headingText text-[7em] w-[400px] p-5 h-[200px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[7px]">
            <p className="text-[#E2D9C8] transform scale-y-[1.4] font-extrabold">
              {about.intro.subheading}
            </p>
          </div>
          <p className="descriptionText text-[#1B1B19] text-[2em]">{about.intro.description}</p>
        </div>
        <div
          className="col2 bg-cover bg-center h-[750px] w-full lg:w-1/2 rounded-[10px] sepia-[65%] saturate-[200%] border-2 border-[#222]"
          style={{ backgroundImage: `url(${about.intro.portraitImage})` }}
        />
      </section>

      {/* Work Experience Section */}
      <section className="workExperience relative h-[600px] mb-[20px] pl-[40px] pr-[40px] box-border py-[40px] gap-[20px] overflow-x-auto overflow-y-hidden flex-nowrap flex flex-row mt-20 select-none cursor-grabbing">
        {work.map((exp, index) => (
          <div
            key={index}
            className="workExperienceCard shrink-0 relative h-[550px] w-[550px] border-4 border-[#222] rounded-[25px] bg-[#E2D9C8] p-5 justify-center items-center mr-5 brightness-[65%] hover:brightness-[85%] transition-all duration-300 cursor-grabbing"
          >
            <div className="dottedContainer relative h-full w-full border-2 border-dashed border-[#222] rounded-[30px] flex flex-col gap-5 p-10">
              <div className="flex flex-row items-left gap-5 mt-5">
                <div className="flex flex-col gap-1 leading-[30px]">
                  <div className="jobSpotlight font-extrabold text-[4em] tracking-wide leading-[60px]">
                    {exp.jobTitle}
                  </div>
                  <div className="font-thin text-[2em]">{exp.timeline}</div>
                </div>
              </div>
              <p className="absolute bottom-[20px] w-[450px] text-[#333] text-[1.3em] whitespace-normal break-words underline decoration-1 decoration-[0.05rem] decoration-[#888] underline-offset-[6px]">
                &ldquo;{exp.description}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Visit Publications */}
      <section className="visitPublication flex flex-row gap-10 justify-between p-20 mt-5">
        <p className="publicationText text-[#222] text-[6em] transform scale-y-[1.2] font-extrabold">PUBLICATIONS</p>
        <a
          href={`/${person}/publications`}
          className="visitCircle w-[350px] h-[100px] text-[3em] border-2 border-[#222] rounded-full mt-10 flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#1B1B19] hover:text-[#E2D9C8] hover:scale-105"
        >
          Visit Now
        </a>
      </section>

      {/* Gallery Images */}
      <section className="aboutSectionImages mt-5 p-10 flex flex-row gap-[5px]">
        {about.images.gallery.map((img, i) => (
          <div
            key={i}
            className="bg-cover bg-center h-[750px] w-1/2 rounded-[10px] sepia-[65%] saturate-[200%] border-2 border-[#222]"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </section>

      {/* Fancy Section */}
      <section className="aboutSectionFancyText mt-10 flex flex-col gap-5 p-10 w-full items-center justify-center">
        <div className="aboutSectionText relative text-[14em] w-full flex justify-center items-center h-[250px] bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px]">
          <p className="text-[#E2D9C8] tracking-wide">{about.fancySection.banner}</p>
        </div>
        <p className="w-full text-left font-thin text-[1.5em]">{about.fancySection.subtitle}</p>
        <p className="aboutFancyDescription text-[3em] leading-tight text-justify text-wrap">
          {about.fancySection.content}{" "}
          {about.fancySection.highlights.map((hl, i) => (
            <span
              key={i}
              className="inline-block bg-[#1B1B19] text-[#E2D9C8] font-extrabold px-4 py-1 rounded-[10px] tracking-wide opacity-90 align-baseline mx-1"
            >
              {hl}
            </span>
          ))}
          <br /><br />
          {about.fancySection.contactNote}{" "}
          <span className="inline-block bg-[#1B1B19] text-[#E2D9C8] font-extrabold px-4 py-1 rounded-[10px] tracking-wide opacity-90 align-baseline mx-1">
            {profile.email}
          </span>
          <br /><br />
          Huge shout-out to{" "}
          {about.fancySection.shoutouts.map((name, i) => (
            <span
              key={i}
              className="inline-block bg-[#1B1B19] text-[#E2D9C8] font-extrabold px-4 py-1 rounded-[10px] tracking-wide opacity-90 align-baseline mx-1"
            >
              {name}
            </span>
          ))}
          {" "}{about.fancySection.shoutoutText}
        </p>
      </section>

      {/* Spotlight */}
      <section className="spotlight relative h-[350px] mb-[20px] py-[40px] gap-[20px] overflow-x-auto overflow-y-hidden flex-nowrap flex flex-row select-none cursor-grabbing">
        {spotlight.map((news, index) => (
          <div
            key={index}
            className="featuredTile relative h-[350px] w-[400px] flex-shrink-0 flex flex-col items-center mt-[10px]"
          >
            <div
              className="h-[150px] w-[90%] bg-cover bg-center rounded-[12px]"
              style={{ backgroundImage: `url(${news.image})` }}
            />
            <span className="w-full flex flex-row px-[20px] items-center justify-between">
              <p className="featureName text-left text-[1.5em]">{news.title}</p>
            </span>
            <p className="featuredDescription text-[1.35em] text-left px-[20px] whitespace-normal break-words w-full overflow-hidden">
              {news.description.slice(0, 150)}...
            </p>
          </div>
        ))}
      </section>

      {/* Contact Banner */}
      <ContactBanner person={person} />
    </>
  );
}
