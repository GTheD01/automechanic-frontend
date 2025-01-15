import { useQuery } from "@tanstack/react-query";

import { fetchAllAppointments } from "@/services/appointmentService";
import AppointmentsList from "./components/AppointmentsList";

import CreateAppointmentModal from "./components/CreateAppointmentModal";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { AppointmentFilters } from "@/types/Appointment";

function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentFilters, setAppointmentFilters] =
    useState<AppointmentFilters>({});
  const [createAppointmentModal, setCreateAppointmentModal] =
    useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allAppointments", appointmentFilters],
    queryFn: fetchAllAppointments,
    staleTime: 1000 * 60 * 5,
  });

  const handleCurrentPage = (el: number) => {
    setCurrentPage(el);
    setAppointmentFilters((prevFilters) => ({
      ...prevFilters,
      page: el - 1,
    }));
  };

  useEffect(() => {
    if (createAppointmentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createAppointmentModal]);

  return (
    <main>
      {createAppointmentModal && (
        <CreateAppointmentModal
          appointments={data?.content}
          modalStateHandler={setCreateAppointmentModal}
        />
      )}
      <div className="md:flex md:justify-between mx-2">
        <form
          className="mb-2 flex md:w-1/2"
          onSubmit={() => console.log("Submit")}
        >
          <label className="sr-only">Search</label>
          <input
            placeholder="Search"
            name="name"
            value=""
            onChange={(e) => console.log(e.target.value)}
            type="text"
            className="outline-none border border-black md:text-base px-2 md:w-full w-1/2"
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
      <AppointmentsList
        appointments={data?.content}
        isError={isError}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
        totalPages={data?.page.totalPages}
      />
    </main>
  );
}

export default Appointments;
