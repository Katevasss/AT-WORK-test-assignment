import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { fetchUsers } from "../../redux/actions";
import EditForm from "../EditForm";
import OtherComponent from "../OtherComponent";

const DisplayComponent: React.FC<{ category: string }> = ({ category }) => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.userReducer);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userIdNum = parseInt(userId!, 10);
  const user = users.find((user) => user.id === userIdNum);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }
  switch (category) {
    case "profileData":
      return <EditForm userId={userIdNum} initialData={user} />;
    case "workSpace":
    case "privacy":
    case "security":
      return <OtherComponent category={category} />;
    default:
      return <EditForm userId={userIdNum} initialData={user} />;
  }
};

export default DisplayComponent;
