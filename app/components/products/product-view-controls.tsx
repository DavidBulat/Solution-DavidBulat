import {
  InfinityIcon,
  LayoutGridIcon,
  ListOrderedIcon,
  TableIcon,
} from "lucide-react";

import {
  NativeSelect,
  NativeSelectOption,
} from "~/components/ui/native-select";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { LIMIT_OPTIONS } from "~/utils/products";

type ProductViewControlsProps = {
  scroll: "pages" | "infinite";
  view: "cards" | "table";
  limit: number;
  onScrollChange: (scroll: "pages" | "infinite") => void;
  onViewChange: (view: "cards" | "table") => void;
  onLimitChange: (limit: number) => void;
  className?: string;
};

export function ProductViewControls({
  scroll,
  view,
  limit,
  onScrollChange,
  onViewChange,
  onLimitChange,
  className,
}: ProductViewControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center",
        className
      )}
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-2 md:w-auto md:justify-start md:gap-3">
        <Tabs
          value={scroll}
          onValueChange={(value) =>
            onScrollChange(value as "pages" | "infinite")
          }
        >
          <TabsList>
            <TabsTrigger value="pages">
              <ListOrderedIcon />
              Pages
            </TabsTrigger>
            <TabsTrigger value="infinite">
              <InfinityIcon />
              Infinite
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <NativeSelect
          value={String(limit)}
          aria-label="Products per page"
          className="shrink-0"
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          {LIMIT_OPTIONS.map((option) => (
            <NativeSelectOption key={option} value={String(option)}>
              {option} per page
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <Tabs
        value={view}
        onValueChange={(value) => onViewChange(value as "cards" | "table")}
        className="w-full md:w-auto"
      >
        <TabsList className="w-full md:w-fit">
          <TabsTrigger value="cards" className="flex-1 md:flex-none">
            <LayoutGridIcon />
            Cards
          </TabsTrigger>
          <TabsTrigger value="table" className="flex-1 md:flex-none">
            <TableIcon />
            Table
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
