import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SearchAutocomplete = () => {
  const [usersList, setUsersList] = useState<string[]>([]);
  const [filteredUser, setFilteredUser] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error("Unable to fetch data!");
        }

        const usersData = await response.json();
        if (usersData && usersData.users && usersData.users.length) {
          const firstNames: string[] = usersData?.users.map(
            (userItem: { firstName: string }) => userItem?.firstName,
          );
          setUsersList(firstNames);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        setLoading(false);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setUserQuery(inputValue);

    if (userQuery.length > 1) {
      const filteredData =
        usersList && usersList.length
          ? usersList.filter((user) => user.toLowerCase().includes(userQuery))
          : [];
      setFilteredUser(filteredData);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const generateRandomUserName = (): string =>
    usersList[Math.floor(Math.random() * usersList.length)];

  const handleSuggestionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsDropdownOpen(false);
    setUserQuery((event.target as HTMLElement).innerText);
    setFilteredUser([]);
  };

  return (
    <div className="w-full min-h-screen bg-[#2B3137] text-white flex flex-col items-center py-10">
      <h1 className="text-6xl font-semibold text-white mb-10">
        Search Autocomplete
      </h1>
      {loading ? (
        <p>Loading Data, please wait</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="relative">
          <input
            type="search"
            id="search-input"
            className="bg-[#595F66] px-4 py-2 rounded-xl w-150 text-white placeholder:text-white/50 focus:outline-none focus:ring-0 focus:border-transparent text-md [&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search Something..."
            autoComplete="off"
            value={userQuery}
            onChange={handleOnSearchChange}
          />
          {userQuery.length > 0 && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Suggestion Box */}
          {isDropdownOpen ? (
            <div className="absolute w-full bg-[#313131] max-h-100 h-auto shadow-2xl px-4 py-3 border border-white/40 rounded-xl">
              <ul>
                {filteredUser && filteredUser.length > 0 ? (
                  filteredUser.map((user, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={handleSuggestionClick}
                    >
                      {user}
                    </li>
                  ))
                ) : (
                  <p className="text-white/50">
                    No Users found.{" "}
                    {usersList.length > 0 &&
                      `Try "${generateRandomUserName()}"`}
                  </p>
                )}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
