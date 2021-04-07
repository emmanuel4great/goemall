import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsAmin } from "../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsAmin(currentUser)) {
      history.push("/login");
    }
  });
  return currentUser;
};

export default useAdminAuth;
