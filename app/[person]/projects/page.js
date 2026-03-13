import { getPersonContent } from "@/lib/content";

async function fetchGitHubRepo(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const [, owner, repo] = match;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) return null;
    const data = await res.json();

    return {
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      url: data.html_url,
      owner: data.owner.login,
      ownerLogo: data.owner.avatar_url,
      topics: data.topics || [],
      language: data.language,
    };
  } catch {
    return null;
  }
}

export default async function ProjectsPage({ params }) {
  const { person } = await params;
  const projectsData = getPersonContent(person, "projects");

  const projects = await Promise.all(
    projectsData.githubRepos.map((url) => fetchGitHubRepo(url))
  );

  return (
    <>
      {/* Header */}
      <div className="w-full p-2 flex h-[200px] flex-row justify-left gap-10">
        <div className="text-[10em] lg:text-[9em] w-1/2 flex justify-center items-center bg-[#1B1B19] text-center opacity-90 select-none rounded-[15px] tracking-[5px]">
          <p className="text-[#E2D9C8]">{projectsData.heading}</p>
        </div>
        <p className="w-1/2 relative flex-wrap break-words text-[#111] font-bold text-[1.4em]">
          {projectsData.description}
        </p>
      </div>

      {/* Projects List */}
      <section className="w-full mt-5 border-t-2 border-[#555] flex flex-col gap-10">
        {projects.map(
          (data, i) =>
            data && (
              <div
                key={i}
                className="w-full flex flex-col items-center justify-center gap-1 border-b-2 border-[#222] pb-5"
              >
                <div className="px-5 flex flex-row justify-between items-center w-full">
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-[2.3em] text-[#222] underline cursor-pointer underline-offset-[6px] decoration-[#555] transition-[0.25s] hover:text-[#66460c]"
                  >
                    {data.name}
                  </a>
                  <span className="flex items-center gap-2 px-4 py-1 rounded-lg bg-[#66460c] shadow-lg">
                    <p className="font-bold text-[1.1em] text-[#fff] tracking-wide drop-shadow">
                      {data.stars}
                    </p>
                    <span className="text-yellow-500 text-[1.5em]">&#9733;</span>
                  </span>
                </div>
                <div className="w-full px-5 flex flex-row gap-2 justify-left items-center">
                  <img
                    src={data.ownerLogo}
                    alt={data.owner}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                  <p className="text-[1.2em] text-[#555] font-semibold">
                    from {data.owner}
                  </p>
                </div>
                <div className="w-full px-5 flex flex-row justify-between">
                  <p className="text-[1.2em] text-[#333] font-semibold w-[70%]">
                    {data.description || "No description provided."}
                  </p>
                </div>
                {data.topics.length > 0 && (
                  <div className="w-full px-5 mt-2 flex flex-row items-left justify-left gap-2">
                    {data.topics.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[#664600] text-[#fff] text-[0.95em] font-medium border border-[#111]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
        )}
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
