import {
  File,
  Globe2,
  MapPin,
  Search,
  UserCheck2,
  Users2,
  Loader2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  followers_url: string;
}

interface GithubFollower {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

function GithubFinder() {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const [githubData, setGithubData] = useState<GithubUser | null>(null);
  const [followers, setFollowers] = useState<GithubFollower[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = userNameInputRef.current?.value.trim();
    if (!username) return;
    await fetchGithubData(username);
  };

  const fetchGithubData = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (response.status === 404) throw new Error("User not found");
      if (!response.ok) throw new Error("Something went wrong. Try again.");

      const data: GithubUser = await response.json();
      setGithubData(data);
      await fetchFollowers(data.followers_url);
    } catch (err) {
      setGithubData(null);
      setFollowers([]);
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowers = async (followersUrl: string) => {
    try {
      const res = await fetch(followersUrl);
      if (!res.ok) throw new Error("Could not load followers");
      const data: GithubFollower[] = await res.json();
      setFollowers(data);
    } catch {
      setFollowers([]);
    }
  };

  const handleClear = () => {
    if (userNameInputRef.current) userNameInputRef.current.value = "";
    setGithubData(null);
    setError(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#2B3137] text-white flex flex-col items-center py-10">
      <h1 className="text-6xl font-semibold text-white mb-10">GitHub Finder</h1>

      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            ref={userNameInputRef}
            id="search-input"
            className="bg-[#595F66] px-4 py-2 rounded-xl w-150 text-white placeholder:text-white/50 focus:outline-none focus:ring-0 focus:border-transparent text-md [&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Enter GitHub username..."
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#2DBA4E] text-white p-2 rounded-xl"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
        </button>
      </form>

      {error && <p className="mt-6 text-red-400 font-medium">{error}</p>}

      {githubData && (
        <div className="grid grid-cols-5 grid-rows-2 gap-9 mx-auto max-w-360 w-full min-h-100 h-auto mt-10 px-8">
          {/* Profile Card */}
          <div className="col-span-4 row-span-3 bg-[#41474E] shadow-lg flex gap-10 py-5 px-8 rounded-2xl">
            <div>
              <div className="w-50 h-50 bg-[#595F66] rounded-2xl outline-2 outline-[#2DBA4E] outline-offset-4 overflow-hidden">
                <img
                  src={githubData.avatar_url}
                  alt={githubData.name ?? githubData.login}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-semibold text-white">
                    {githubData.name ?? githubData.login}
                  </h2>
                  <span className="bg-white/20 px-3 rounded-full py-1 font-normal text-white/70">
                    {githubData.login}
                  </span>
                </div>

                <article className="text-[#DDE3EB]">
                  {githubData.bio ?? "No bio available"}
                </article>

                <div className="flex gap-5 text-sm flex-wrap">
                  <div className="flex gap-1 items-center">
                    <MapPin className="w-4" />{" "}
                    {githubData.location ?? "Unknown"}
                  </div>
                  <a
                    href={githubData.blog || githubData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center hover:text-[#2DBA4E]"
                  >
                    <Globe2 className="w-4" />
                    {githubData.blog || githubData.html_url}
                  </a>
                  <div className="flex gap-1 items-center">
                    <File className="w-4" /> {githubData.public_repos} Repos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Core */}
          <div className="col-span-1 row-span-3 col-start-5 bg-[#41474E] shadow-lg rounded-2xl py-5 px-8">
            <h2 className="text-2xl font-semibold">Activity Core</h2>
            <div className="flex flex-col gap-7 mt-5">
              <div className="flex gap-5 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#2DBA4E]/40 flex items-center justify-center rounded-lg">
                    <Users2 />
                  </div>
                  Followers
                </div>
                <p className="text-2xl font-semibold">{githubData.followers}</p>
              </div>
              <div className="flex gap-5 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#2DBA4E]/40 flex items-center justify-center rounded-lg">
                    <UserCheck2 />
                  </div>
                  Following
                </div>
                <p className="text-2xl font-semibold">{githubData.following}</p>
              </div>
            </div>
          </div>

          {/* Network Hub */}
          <div className="col-span-5 row-span-2 row-start-4 bg-[#41474E] shadow-lg rounded-2xl py-5 px-8">
            <h2 className="text-xl">Network Hub</h2>
            <div className="flex gap-4 py-4 flex-wrap">
              {followers.length === 0 && (
                <p className="text-white/50 text-sm">No followers to show</p>
              )}
              {followers.map((f) => (
                <a
                  key={f.id}
                  href={f.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 bg-[#595F66] p-3 rounded-lg"
                >
                  <div className="w-20 h-20 border border-[#2DBA4E] rounded-full overflow-hidden">
                    <img
                      src={f.avatar_url}
                      alt={f.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white capitalize">{f.login}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GithubFinder;
