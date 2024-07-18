import { fetchService } from "@/app/lib/data";
import SingleServiceClient from "./SingleServiceClient";

const SingleServicePage = async ({ params }) => {
  const { id } = params;
  const service = await fetchService(id);
  return <SingleServiceClient service={service} />;
};

export default SingleServicePage;
