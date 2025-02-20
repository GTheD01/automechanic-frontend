import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useRef, useState } from "react";

import { UserFilters } from "@/types/User";
import SearchFilter from "@/components/SearchFilter";
import { Pagination } from "@/components/Pagination";
import { fetchAllUsers } from "@/services/userService";
import UsersList from "@/pages/Users/components/UsersList";

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
        <SearchFilter handleSearchFilter={handleSearchFilter} ref={nameRef} />

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
