import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
