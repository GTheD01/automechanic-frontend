import { useQuery } from "@tanstack/react-query";

import { fetchAllAppointments } from "@/services/appointmentService";
import AppointmentsList from "./components/AppointmentsList";

function Appointments() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allAppointments"],
    queryFn: fetchAllAppointments,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main>
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
          onClick={() => console.log("Open create appointment modal")}
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
    </main>
  );
}

export default Appointments;
