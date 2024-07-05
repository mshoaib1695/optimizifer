import dynamic from "next/dynamic";
import { metadata as mdata} from "../components/CompressPdf/metadata";

export const metadata = mdata;

const CompressPdf = dynamic(() => import("../components/CompressPdf"), {
  ssr: false,
});

export default function Page() {
  return <CompressPdf />;
}
