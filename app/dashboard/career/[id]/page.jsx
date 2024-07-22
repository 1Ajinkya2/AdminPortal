import { fetchCareer } from "@/app/lib/data";
import SingleCareerClient from "./SingleCareerClient";

const SingleCareerPage = async ({ params }) => {
  const { id } = params;
  const career = await fetchCareer(id);
  return <SingleCareerClient career={career} />;
};

export default SingleCareerPage;
