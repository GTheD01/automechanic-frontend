import { useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import UserField from "@/components/UserField";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import UserCars from "@/pages/UserProfile/UserCars";

import { getUserProfile } from "@/services/userService";
import UserReports from "@/pages/UserProfile/UserReports";
import SubMenu from "@/pages/UserProfile/components/SubMenu";
import useDeleteUserAccount from "@/hooks/useDeleteUserAccount";
import UserAppointments from "@/pages/UserProfile/UserAppointments";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

export type MenuItem = "Cars" | "Appointments" | "Reports";

function UserProfile() {
  const { userId } = useParams();

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>("Cars");
  const [deleteAccountModalState, setDeleteAccountModalState] = useState(false);

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 15,
  });

  const { onDeleteAccount } = useDeleteUserAccount({ userId: user?.id });

  if (isLoading) {
    return <Spinner lg />;
  }

  if (isError || !user) {
    return <div>Couldn't load the user!</div>;
  }

  const SubMenuItems: MenuItem[] = ["Cars", "Appointments", "Reports"];

  return (
    <>
      <DeleteConfirmationModal
        bodyText="Are you sure you want to delete this account? This action is irreversible."
        headerText="Delete Account"
        handleOnCloseModal={() => setDeleteAccountModalState(false)}
        modalState={deleteAccountModalState}
        onDelete={onDeleteAccount}
      />
      <section>
        <Button to="/users" link className="py-2 px-4">
          Back to Users
        </Button>

        <div>
          <h3 className="mt-8 mb-4 text-3xl font-bold text-center">
            {user.firstName} {user.lastName}
          </h3>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-3 border-t-2 py-8 relative">
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
            <button
              onClick={() => setDeleteAccountModalState(true)}
              className="text-red-800 hover:underline hover:text-red-950 absolute right-2 outline-none"
            >
              Delete account
            </button>
          </div>
        </div>
        <SubMenu
          subMenuItems={SubMenuItems}
          selectedMenuItem={selectedMenuItem}
          onSelectMenuItem={setSelectedMenuItem}
        />
        {selectedMenuItem === "Cars" && <UserCars />}
        {selectedMenuItem === "Appointments" && <UserAppointments />}
        {selectedMenuItem === "Reports" && <UserReports />}
      </section>
    </>
  );
}

export default UserProfile;
