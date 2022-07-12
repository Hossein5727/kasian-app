import { useEffect } from "react";
import { useParams } from "react-router-dom";

function PodcastDetailPage() {
  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    console.log(paramsId);
  }, []);

  return <div className="w-full bg-red-800">PodcastDetailPage</div>;
}

export default PodcastDetailPage;
