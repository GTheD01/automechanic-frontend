import { Link } from "react-router-dom";

function UserCarPage() {
  return (
    <div>
      <Link
        to={"/my-cars"}
        className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2"
      >
        Back to Cars List
      </Link>
      <div>User Car Page</div>
    </div>
  );
}

export default UserCarPage;
