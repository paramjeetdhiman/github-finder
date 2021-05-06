import { UserItem } from "./UserItem";

export const Users = ({ loading, users }) => {
  console.log(users);
  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3 ,1fr)",
  gridGap: "1rem",
};
