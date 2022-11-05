import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Map></Map>
    </div>
  );
}
