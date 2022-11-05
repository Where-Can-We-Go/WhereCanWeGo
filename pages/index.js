import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-1/4 block float-left">
        {/* search container */}
        <div className="m-8 w-3/4">
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
        </div>
        {/* Info boxes container */}
        <div className="h-5/6 w-full"></div>
      </div>
      <div className="h-screen w-3/4 block float-right">
        <Map></Map>
      </div>
    </div>
  );
}
