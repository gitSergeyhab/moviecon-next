import { PrimaryHeader } from "@/shared/components/ui/text";
import { FC } from "react";
import { LinksSection } from "./LinksSection";
import { DescriptionList } from "./DescriptionList";
import { title } from "./const";

const AboutPage: FC = () => {
  return (
    <div className="rounded-lg max-w-[1200px] m-auto mb-16 ">
      <div className=" bg-neutral-200/90 dark:bg-neutral-900/90 py-2 md:py-16 rounded-lg md:p-24 min-h-[600px] md:min-h-[880px] flex flex-col gap-2">
        <PrimaryHeader className="text-center mb-2 md:mb-6 ">
          {title}
        </PrimaryHeader>
        <DescriptionList />
        <LinksSection />
      </div>
    </div>
  );
};

export default AboutPage;
