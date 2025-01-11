import { User } from "@/types/User";
import { Link } from "react-router-dom";

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
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-3 break-words">
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              User ID:
            </p>
            <p className="text-sm md:text-base">{user.id}</p>
          </div>
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              Email:
            </p>
            <p className="text-sm lg:text-base">{user.email}</p>
          </div>
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              Role:
            </p>
            <p className="text-sm lg:text-base">{user.userRole}</p>
          </div>
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              Phone Number:
            </p>
            <p className="text-sm lg:text-base">
              {user.phoneNumber ? user.phoneNumber : "No phone added"}
            </p>
          </div>
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              Total Appointments:
            </p>
            <p className="text-sm lg:text-base">{user.appointmentCount}</p>
          </div>
          <div>
            <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
              Total cars:
            </p>
            <p className="text-sm lg:text-base">{user.carsCount}</p>
          </div>
        </div>
      </div>
      <Link
        to={`/users`}
        className="bg-secondary text-white rounded-3xl py-2 px-4 text-sm sm:px-6 sm:text-base hover:bg-secondaryHover"
      >
        Profile
      </Link>
    </li>
  );
}

export default UserCard;
