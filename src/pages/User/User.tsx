import { Link, Outlet, useParams } from "react-router-dom";

import SubMenu from "./components/SubMenu";
import UserField from "@/components/UserField";

export type MenuItem = "Cars" | "Appointments" | "Reports";

function User() {
  const { userId } = useParams();
  const user = {
    firstName: "Sinalco",
    lastName: "Cola",
    id: "1",
    email: "something@gmail",
    userRole: "ADMIN",
    phoneNumber: "0492342342",
    appointmentCount: 0,
    carsCount: 0,
  };

  const SubMenuItems: MenuItem[] = ["Cars", "Appointments", "Reports"];

  return (
    <section>
      <Link
        to={"/users"}
        className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2"
      >
        Back to Users
      </Link>
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
      <SubMenu subMenuItems={SubMenuItems} />
      <Outlet />
    </section>
  );
}

export default User;
