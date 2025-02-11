import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useRef, useState } from "react";

import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { AppointmentFilters } from "@/types/Appointment";
import { fetchAllAppointments } from "@/services/appointmentService";
import AppointmentsList from "@/pages/Appointments/components/AppointmentsList";
import CreateAppointmentModal from "@/pages/Appointments/components/CreateAppointmentModal";

function Appointments() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentFilters, setAppointmentFilters] =
    useState<AppointmentFilters>({});
  const [createAppointmentModal, setCreateAppointmentModal] =
    useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointments", appointmentFilters, "2"],
    queryFn: fetchAllAppointments,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  const handleSearchFilter = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppointmentFilters((prevFilters) => ({
      ...prevFilters,
      search: searchRef?.current?.value,
    }));
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
      setAppointmentFilters((prevFilters) => ({
        ...prevFilters,
        page: el - 1,
      }));
    },
    [currentPage]
  );

  const onClose = () => {
    setCreateAppointmentModal(false);
  };

  return (
    <section>
      <CreateAppointmentModal
        appointments={data?.content}
        onClose={onClose}
        modalState={createAppointmentModal}
      />

      <div className="md:flex md:justify-between mx-2">
        <form className="mb-2 flex md:w-1/2" onSubmit={handleSearchFilter}>
          <label className="sr-only">Search</label>
          <input
            ref={searchRef}
            placeholder="Search"
            name="search"
            type="text"
            className="outline-none border border-black md:text-base p-2 md:w-full w-1/2"
          />
          <button
            type="submit"
            className="bg-secondary hover:bg-secondaryHover text-white px-4"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => setCreateAppointmentModal(true)}
          className="bg-secondary text-white rounded-3xl py-2 px-4 sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base"
        >
          Create appointment
        </button>
      </div>

      {isLoading && <Spinner lg />}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching your appointments. Please try again later.
        </p>
      )}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">No appointments found.</p>
      )}
      {data && data.content && <AppointmentsList appointments={data.content} />}
      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </section>
  );
}

export default Appointments;
