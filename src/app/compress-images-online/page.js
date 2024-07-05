import dynamic from "next/dynamic";
import { metadata as mdata} from "../components/CompressImages/metadata";

export const metadata = mdata;

const CompressImages = dynamic(() => import("../components/CompressImages"), {
  ssr: false,
});

export default function Page() {
  return <CompressImages />;
}
