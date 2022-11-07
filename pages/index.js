import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ScrollArea } from "@mantine/core";
import { Button } from "@mantine/core";
import Display from "../components/display";
import create from "zustand";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

// const Display = dynamic(() => import("../components/display"), {
//   ssr: false,
// });

const useNameStore = create((set) => ({
  nonprofits: [],
  getNonprofitData: async () => {
    const npData = await getData();
    set({ nonprofits: npData });
  },
}));

async function getData() {
  const res = await fetch(
    "http://localhost:3000/api/getMapData?" +
      new URLSearchParams({ zipCode: "32608" })
  );
  const data = await res.json();
  return data.searchResult;
}

export default function Home() {
  const nonprofits = useNameStore((state) => state.nonprofits);
  const getNonprofitData = useNameStore((state) => state.getNonprofitData);

  return (
    <div className="h-screen w-full">
      <div className="h-full w-1/4 block float-left">
        {/* search container */}
        <div className="w-full h-1/6 p-4">
          <div className="flex justify-center">
            <input
              className="w-5/6 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </div>
          <div className="pt-2 flex justify-center">
            <Button.Group>
              <Button variant="default">Filter 1</Button>
              <Button variant="default">Filter 2</Button>
              <Button variant="default">Filter 3</Button>
              <Button variant="default">Filter 4</Button>
              <Button variant="default">Filter 5</Button>
            </Button.Group>
          </div>
          <div className="pt-1 flex justify-center">
            <Button.Group>
              <Button variant="default" onClick={getNonprofitData}>
                *Load Data
              </Button>
              <Button variant="default">Filter 2</Button>
              <Button variant="default">Filter 3</Button>
              <Button variant="default">Filter 4</Button>
            </Button.Group>
          </div>
        </div>
        {/* Info boxes container */}
        <div className="w-full h-5/6 flex justify-center">
          <ScrollArea type="hover" className="w-5/6 h-full">
            {nonprofits.map((npInfo, i) => {
              return (
                <Display
                  key={npInfo.EIN}
                  name={npInfo.NAME}
                  address={
                    npInfo.STREET +
                    ", " +
                    npInfo.CITY +
                    ", " +
                    npInfo.STATE +
                    " " +
                    npInfo.ZIP
                  }
                  orgType={npInfo["Classification Code"]}
                ></Display>
              );
            })}

            {/* 11x Displays */}
            {/* <Display>{name}</Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display>
            <Display></Display> */}
          </ScrollArea>
        </div>
      </div>
      <div className="h-screen w-3/4 block float-right">
        <Map></Map>
      </div>
    </div>
  );
}
