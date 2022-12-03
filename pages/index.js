import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Display from "../components/display";
import create from "zustand";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const Map = dynamic(() => import("../components/map"), {
  ssr: false,
});

const useNameStore = create((set, get) => ({
  nonprofits: [],
  inputZip: "32608",
  getNonprofitData: async () => {
    const npData = await getData(get().inputZip);
    set({ nonprofits: npData });
  },
  setInputZip: (newInputZip) => { //Changes the zipcode from default to the user value
    set((state) => ({
      inputZip: newInputZip,
    }));
  },
}));

async function getData(inputZip) {
  const res = await fetch(
    "/api/getMapData?" + new URLSearchParams({ zipCode: inputZip })
  );
  const data = await res.json();
  return data.searchResult;
}

export default function Home() {
  const nonprofits = useNameStore((state) => state.nonprofits);
  const getNonprofitData = useNameStore((state) => state.getNonprofitData);
  const setInputZip = useNameStore((state) => state.setInputZip); //Sets the zipcode to what the user inputs

  const form = useForm({ //Handles the value for the search bar
    initialValues: {
      searchVal: "",
    },
  });

  return (
    <div className="h-screen w-full">
      <div className="h-1/2 min-[1200px]:h-screen w-full min-[1200px]:w-2/3 block min-[1200px]:float-right min-[1620px]:w-3/4">
        <Map></Map>
      </div>
      <div className="h-1/2 min-[1200px]:h-full w-full min-[1200px]:w-1/3 block min-[1200px]:float-left min-[1620px]:w-1/4">
        {/* search container */}
        <div className="w-full p-4 h-1/4 max-[1200px]:h-1/2">
          <div className="flex justify-center">
            <form
              onSubmit={form.onSubmit((values) => {
                setInputZip(values.searchVal);
              })}
            >
              <TextInput // Textbox for the website's search bar
                className="w-5/6 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter a zipcode..."
                {...form.getInputProps("searchVal")}
              />
            </form>
            <Button variant="default" onClick={getNonprofitData}> 
                Search
              </Button>
          </div>
          <div className="h-3/4 text-center items-center grid grid-flow-col auto-cols-auto max-[375px]:grid-rows-2 max-[375px]:grid-cols-2 gap-2 justify-center">
            <div>
              <Button
                variant="default"
                onClick={getNonprofitData}
                className="rounded-full"
              >
                *Load Data
              </Button>
            </div>
            <div>
              <Button variant="default" className="rounded-full">
                Filter 2
              </Button>
            </div>
            <div>
              {" "}
              <Button variant="default" className="rounded-full">
                Filter 3
              </Button>
            </div>
            <div>
              <Button variant="default" className="rounded-full">
                Filter 4
              </Button>
            </div>
          </div>
        </div>
        {/* Info boxes container */}
        <div className="w-full overflow-auto h-3/4 flex justify-center max-[1200px]:h-1/2 ">
          <ScrollArea type="hover" className="w-5/6">
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
    </div>
  );
}
