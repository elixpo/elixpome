import { getPersonContent, getValidPersons } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getValidPersons().map((person) => ({ person }));
}

export async function generateMetadata({ params }) {
  const { person } = await params;
  const profile = getPersonContent(person, "profile");
  return {
    title: `${profile.name} | ${profile.siteName}`,
    description: `Portfolio of ${profile.name}`,
  };
}

export default async function PersonLayout({ children, params }) {
  const { person } = await params;
  const validPersons = getValidPersons();
  if (!validPersons.includes(person)) {
    notFound();
  }

  const profile = getPersonContent(person, "profile");

  return (
    <div className="relative min-h-screen bg-white">
      {/* Paper texture overlay */}
      <div
        className="fixed top-0 left-0 w-screen h-screen opacity-55 bg-contain bg-repeat bg-center brightness-[55%] sepia-[65%] pointer-events-none z-0"
        style={{ backgroundImage: `url(/assets/${person}/paperTexture.jpg)` }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 h-[80px] flex items-center justify-between border-b-2 border-[#888] px-4 sm:px-8 md:px-[50px] bg-white/80 backdrop-blur-sm">
        <p className="text-sm sm:text-lg md:text-[1.5em]">{profile.location}</p>
        <a href={`/${person}`} className="text-xl sm:text-2xl md:text-[3em] cursor-pointer">
          {profile.siteName}
        </a>
        <div className="flex gap-4 text-sm">
          {profile.menuItems.map((item) => (
            <a
              key={item}
              href={`/${person}${item === "Home" ? "" : `/${item.toLowerCase()}`}`}
              className="hover:underline underline-offset-4"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-[1440px] p-4 sm:p-6 md:p-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-[#222] mt-10">
        <div className="flex flex-col sm:flex-row justify-around items-center py-5 px-4">
          <p className="text-[#111] text-xl sm:text-2xl md:text-[3em] select-none">
            {profile.siteName.toUpperCase()}
          </p>
          <div className="flex gap-5 mt-3 sm:mt-0 items-center">
            {profile.socials.map((social, idx) => (
              <span key={social.platform} className="flex items-center gap-3">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl hover:rotate-[10deg] transition-transform"
                >
                  {social.platform}
                </a>
                {idx < profile.socials.length - 1 && (
                  <span className="h-[10px] w-[10px] rounded-full bg-[#111]" />
                )}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
