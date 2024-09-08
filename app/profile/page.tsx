"use client";
import { FC } from "react";
import { useSelector } from "react-redux";
import { UserResultsSection } from "./Result/UserResultsSection";
import { userSelectors } from "@/shared/store/user";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { PrimaryHeader } from "@/shared/components/ui/text";
import { UserRecordsSection } from "./Record/UserRecordsSection";

const ProfilePage: FC = () => {
  const user = useSelector(userSelectors.getUser);
  const loading = useSelector(userSelectors.getUserStatus) === "loading";

  if (loading) {
    return (
      <ContentLoader
        size="2xl"
        className="bg-neutral-500/50 max-w-[1200px] mx-auto min-h-96 "
      />
    );
  }
  if (!user) return null;
  return (
    <div className=" bg-neutral-200/50 dark:bg-neutral-800/50 flex flex-wrap gap-4 max-w-[1600px] mx-auto mt-8 px-0 pb-12 pt-4 rounded-lg sm:px-8">
      <div className="col-span-2 w-full p-2 rounded-lg sm:p-4">
        <PrimaryHeader className="text-center">
          Страница профиля пользователя
          <br />
          <span className="text-orange-500">{user.name}</span>
        </PrimaryHeader>
        {/* // TODO add user avatar */}
      </div>
      <div className="grid grid-cols-1 w-full gap-8 lg:grid-cols-2 ">
        <UserRecordsSection />
        <UserResultsSection />
      </div>
    </div>
  );
};

export default ProfilePage;
