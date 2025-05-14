import { User } from "@/types/User";
import Button from "@/components/common/Button";
import UserField from "@/components/UserField";

function UserCard({ user }: { user: User }) {
  return (
    <li className="shadow-xl py-8 px-4 md:flex md:justify-between md:items-center relative">
      <div className="md:w-2/3 mb-8 md:mb-0">
        <span
          className={`${
            user.enabled ? "text-green-500" : "text-red-500"
          } text-xs absolute top-2 left-2`}
        >
          {user.enabled ? "Active" : "Inactive"}
        </span>
        <h4 className="font-bold text-xl mb-2">
          {user.firstName} {user.lastName}
        </h4>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-3">
          <UserField content={user.id} field="User ID" />
          <UserField content={user.email} field="Email" />
          <UserField content={user.userRole} field="Role" />
          <UserField
            content={user.phoneNumber ? user.phoneNumber : "No phone added."}
            field="Phone Number"
          />
          <UserField
            content={user.appointmentCount}
            field="Total Appointments"
          />
          <UserField content={user.carsCount} field="Total cars" />
        </div>
      </div>
      <Button link to={`${user.id}`} className="rounded-3xl py-2 px-4 sm:px-6">
        Profile
      </Button>
    </li>
  );
}

export default UserCard;
