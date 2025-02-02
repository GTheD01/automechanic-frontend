import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useRef, useState } from "react";

import { UserFilters } from "@/types/User";
import UsersList from "@/pages/Users/components/UsersList";
import { Pagination } from "@/components/Pagination";
import { fetchAllUsers } from "@/services/userService";

function Users() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<UserFilters>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", filters, "4"],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  const handleUserFilters = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSearchFilter = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameRef) {
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: nameRef?.current?.value,
    }));
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: el - 1,
      }));
    },
    [currentPage]
  );

  return (
    <section>
      <div className="pl-2 border-b-2">
        <form className="mb-2 flex" onSubmit={handleSearchFilter}>
          <label className="sr-only">Search by name</label>
          <input
            placeholder="Search by name"
            name="name"
            ref={nameRef}
            type="text"
            className="outline-none border border-black w-1/2 p-2"
          />
          <button
            type="submit"
            className="bg-secondary hover:bg-secondaryHover text-white px-4"
          >
            Search
          </button>
        </form>
        <div className="my-6">
          <div className="flex gap-1">
            <label htmlFor="hasAppointments" className="text-sm sm:text-base">
              Has appointments
            </label>
            <input
              id="hasAppointments"
              name="hasAppointments"
              type="checkbox"
              onChange={handleUserFilters}
              className="accent-black"
            />
          </div>

          <div className="flex gap-1">
            <label htmlFor="hasCars" className="text-sm sm:text-base">
              Has cars
            </label>
            <input
              id="hasCars"
              name="hasCars"
              type="checkbox"
              onChange={handleUserFilters}
              className="accent-black"
            />
          </div>
        </div>
      </div>
      <UsersList
        isError={isError}
        isLoading={isLoading}
        users={data?.content}
      />

      <Pagination
        totalPages={data?.page?.totalPages}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
      />
    </section>
  );
}

export default Users;
