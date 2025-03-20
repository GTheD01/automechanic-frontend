import UserField from "@/components/UserField";
import { useUserContext } from "@/providers/UserContextProvider";

function UserProfile() {
  const { user } = useUserContext();

  if (!user) {
    return <p>Couldn't fetch the user.</p>;
  }
  return (
    <section>
      <div>
        <h3 className="mt-8 m-4 text-3xl font-bold text-center">
          {user.firstName} {user.lastName}
        </h3>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-3 border-y-2 py-8">
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
    </section>
  );
}

export default UserProfile;
