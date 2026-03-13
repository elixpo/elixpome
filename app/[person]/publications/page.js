import { getPersonContent } from "@/lib/content";

export default async function PublicationsPage({ params }) {
  const { person } = await params;
  const pubs = getPersonContent(person, "publications");

  return (
    <>
      {/* Header */}
      <section className="mt-5 px-10 flex flex-col items-center w-full">
        <div className="text-[14em] lg:text-[12em] w-full h-[350px] flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
          <p className="text-[#E2D9C8] transform scale-y-[1.6]">{pubs.heading}</p>
        </div>
        <div className="text-[5em] lg:text-[4.5em] mt-5 w-full text-left leading-[80px]">
          <p className="text-[#1B1B19]">{pubs.description}</p>
        </div>
      </section>

      {/* Pre-publication images */}
      <section className="relative mt-5 p-10 flex flex-row w-full justify-center gap-5">
        {pubs.images.map((img, i) => (
          <div
            key={i}
            className="bg-cover bg-center h-[750px] w-1/2 rounded-[10px] sepia-[65%] saturate-[200%] border-2 border-[#222]"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </section>

      {/* Publications List */}
      <section className="mt-5 p-10 flex flex-col items-left w-full gap-5 overflow-hidden">
        {pubs.papers.map((pub, index) => (
          <div
            key={index}
            className="relative h-[60px] w-full flex flex-row items-center justify-between border-t-2 border-b-2 border-[#111] px-6 py-3"
          >
            <div className="h-full flex-1 flex items-center overflow-hidden">
              <p className="font-extrabold text-lg md:text-xl lg:text-2xl text-left tracking-[2px] p-6 truncate">
                {pub.title}
              </p>
            </div>
            <div className="flex flex-row gap-3 items-center flex-shrink-0">
              <p className="text-[#222] text-lg md:text-xl font-bold whitespace-nowrap">
                {pub.year}
              </p>
              {pub.isNew && (
                <span className="flex h-[28px] px-2 text-sm md:text-base text-[#ffc] bg-[#B63B12] items-center justify-center rounded-[5px]">
                  NEW
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Contact Banner */}
      <section className="overflow-hidden w-full border-y-2 border-[#111] mt-10 pt-5 pb-5 select-none">
        <a href={`/${person}/connect`} className="block">
          <div className="whitespace-nowrap flex flex-row gap-[10px] w-max">
            <p className="font-bold text-left text-[5em] text-[#1B1B19]">
              Let&apos;s Collaborate Together!
            </p>
            <div className="text-[5em] flex items-center justify-center p-2 bg-[#1B1B19] text-center opacity-90 rounded-[8px] cursor-pointer">
              <p className="text-[#E2D9C8] tracking-wide leading-[100px] font-bold whitespace-nowrap">
                CONNECT WITH ME
              </p>
            </div>
          </div>
        </a>
      </section>
    </>
  );
}
