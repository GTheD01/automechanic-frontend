import React from "react";

import { User } from "@/types/User";
import Spinner from "@/components/common/Spinner";
import UserCard from "@/pages/Users/components/UserCard";

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
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    );
  }
);

export default UsersList;
