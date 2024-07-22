import { fetchUser } from "@/app/lib/data";
import SingleUserClient from "./SingleUserClient";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  return <SingleUserClient user={user} />;
};

export default SingleUserPage;
