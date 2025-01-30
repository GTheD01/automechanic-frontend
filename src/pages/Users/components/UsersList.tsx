import React from "react";

import Spinner from "@/components/Spinner";
import UserCard from "./UserCard";
import { User } from "@/types/User";

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

const UsersList = React.memo(
  ({ users, isLoading, isError }: UsersListProps) => {
    if (isLoading) {
      return <Spinner lg />;
    }

    if (isError) {
      return <p>There was an error fetching users</p>;
    }
    return (
      <ul>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    );
  }
);

export default UsersList;
