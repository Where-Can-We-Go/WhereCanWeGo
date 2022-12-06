import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ScrollArea } from "@mantine/core";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Display from "../components/display";
import create from "zustand";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { signIn, signOut, useSession } from "next-auth/react";

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
  setInputZip: (newInputZip) => {
    //Changes the zipcode from default to the user value
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
  const { data: session } = useSession();

  const form = useForm({
    //Handles the value for the search bar
    initialValues: {
      searchVal: "",
    },
    validate: {
      searchVal: (value) =>
        value.length != 5 || /[^\d]/.test(value)
          ? "Please enter a valid 5-digit zipcode"
          : null,
    },
  });

  return (
    <div className="h-screen w-full">
      <div className="h-1/2 min-[1200px]:h-screen w-full min-[1200px]:w-2/3 block min-[1200px]:float-right min-[1620px]:w-3/4">
        <Map></Map>
      </div>
      <div className="h-1/2 min-[1200px]:h-full w-full min-[1200px]:w-1/3 block min-[1200px]:float-left min-[1620px]:w-1/4">
        {/* search container */}
        <div className="w-full p-4 h-1/3 max-[1200px]:h-1/2">
          <div className="flex justify-center">
            <form
              onSubmit={form.onSubmit((values) => {
                setInputZip(values.searchVal);
                getNonprofitData();
                form.reset();
              })}
            >
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <TextInput // Textbox for the website's search bar
                    className="w-full"
                    placeholder="Enter a zipcode..."
                    {...form.getInputProps("searchVal")}
                  />
                </div>
                <div>
                  <Button variant="default" type="submit" className="w-full">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="h-3/4">
            <div className="h-3/4 text-center items-center grid grid-flow-col auto-cols-auto gap-2 justify-center">
              <div>
                <Button
                  variant="default"
                  className="rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100"
                >
                  <img src="\images\034-house.png" className="w-[50px]"></img>
                </Button>
                <p className="center text-sm">Shelter/Housing</p>
              </div>
              <div>
                <Button
                  variant="default"
                  className="rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100"
                >
                  <img src="\images\030-food.png" className="w-[50px]"></img>
                </Button>
                <p className="center text-sm">Food</p>
              </div>
              <div>
                <Button
                  variant="default"
                  className="rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100"
                >
                  <img
                    src="\images\021-teamwork.png"
                    className="w-[50px]"
                  ></img>
                </Button>
                <p className="center text-sm">Social Services</p>
              </div>
              <div>
                <Button
                  variant="default"
                  className="rounded-full w-[75px] h-[75px] max-[1200px]:w-[50px] max-[1200px]:h-[50px] hover:border-4 hover:bg-slate-100"
                >
                  <img
                    src="\images\018-stethoscope.png"
                    className="w-[50px]"
                  ></img>
                </Button>
                <p className="center text-sm">Health</p>
              </div>
            </div>
            <div className="h-1/4 text-center">
              {session ? (
                <Button
                  variant="default"
                  className="rounded-full hover:bg-slate-100"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="rounded-full hover:bg-slate-100"
                  onClick={() => {
                    signIn();
                  }}
                >
                  Sign In
                </Button>
            </div>
          </div>
        </div>
        {/* Info boxes container */}
        <div className="w-full overflow-auto h-2/3 flex justify-center max-[1200px]:h-1/2 ">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
