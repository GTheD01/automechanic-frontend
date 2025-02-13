import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import UserCars from "@/pages/User/UserCars";
import UserField from "@/components/UserField";
import SubMenu from "@/pages/User/components/SubMenu";
import { getUserProfile } from "@/services/userService";
import UserAppointments from "@/pages/User/UserAppointments";

export type MenuItem = "Cars" | "Appointments" | "Reports";

function User() {
  const { userId } = useParams();

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>("Cars");

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return <Spinner lg />;
  }

  if (isError || !user) {
    return <div>Couldn't load the user!</div>;
  }

  const SubMenuItems: MenuItem[] = ["Cars", "Appointments", "Reports"];

  return (
    <section>
      <Button to="/users" link className="py-2 px-4">
        Back to Users
      </Button>

      <div>
        <h3 className="my-8 text-3xl font-bold text-center border-b-2">
          {user.firstName} {user.lastName}
        </h3>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-3 border-b-2 pb-8">
          <UserField
            content={user.id}
            field="User ID"
            className="flex flex-col items-center"
          />
          <UserField
            content={user.email}
            field="Email"
            className="flex flex-col items-center"
          />
          <UserField
            content={user.userRole}
            field="Role"
            className="flex flex-col items-center"
          />
          <UserField
            content={user.phoneNumber ? user.phoneNumber : "No phone added."}
            field="Phone Number"
            className="flex flex-col items-center"
          />
          <UserField
            content={user.appointmentCount}
            field="Total Appointments"
            className="flex flex-col items-center"
          />
          <UserField
            content={user.carsCount}
            field="Total cars"
            className="flex flex-col items-center"
          />
        </div>
      </div>
      <SubMenu
        subMenuItems={SubMenuItems}
        selectedMenuItem={selectedMenuItem}
        onSelectMenuItem={setSelectedMenuItem}
      />
      {selectedMenuItem === "Cars" && <UserCars />}
      {selectedMenuItem === "Appointments" && <UserAppointments />}
      {selectedMenuItem === "Reports" && <div>reports</div>}
    </section>
  );
}

export default User;
