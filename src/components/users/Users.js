import { useContext } from "react";
import { Spinner } from "../layouts/Spinner";
import { UserItem } from "./UserItem";
import { GithubContext } from "../../context/github/githubContext";

export const Users = () => {
  /// now we have access to state from githubState
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;

  return (
    <div style={userStyle}>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => <UserItem key={user.id} user={user} />)
      )}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3 ,1fr)",
  gridGap: "1rem",
};
