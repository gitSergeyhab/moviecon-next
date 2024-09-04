"use client";
import { FC, useState } from "react";
import { aboutData } from "./const";
import { DescriptionItem } from "./DescriptionItem";

export const DescriptionList: FC = () => {
  const [openId, setOpenId] = useState<null | number>(null);

  const onClick = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <ul className="p-2 border-4 border-neutral-800 dark:border-neutral-200 rounded-md">
      {aboutData.map((description) => (
        <DescriptionItem
          key={description.id}
          description={description}
          onClick={() => onClick(description.id)}
          openId={openId}
        />
      ))}
    </ul>
  );
};
