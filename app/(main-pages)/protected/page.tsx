
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import LinkSection from "./components/LinkSection";
import Items from "./components/Items";
import Barchart from "./components/Barchart";
import Carousel from "./components/Carousel";
export default async function ProtectedPage() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
    <div className="w-full h-full">
      <LinkSection></LinkSection>
      <Barchart></Barchart>
      <Items></Items>
      {/* <Carousel></Carousel> */}
    </div>
  );
}
