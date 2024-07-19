import { fetchImage } from "@/app/lib/data";
import SingleBgImageClient from "./SingleBgImageClient";

const SingleBgImagePage = async ({ params }) => {
  const { id } = params;
  const bgImage = await fetchImage(id);
  return <SingleBgImageClient bgImage={bgImage} />;
};

export default SingleBgImagePage;
