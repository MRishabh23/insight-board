import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoCircle } from "@/components/icons/common";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

export const TableCellTooltip = ({ ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent className="item-center flex justify-center">{props.tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TableCellTooltipScroll = ({ ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent className="item-center flex w-72 justify-center text-wrap">
          <ScrollArea className="h-32">{props.tip}</ScrollArea>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TableHeaderTooltip = ({ ...props }) => {
  return (
    <div className="flex items-center">
      <p>{props.name}</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoCircle className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// export const TableHeadCustom = ({ ...props }) => {
//   return <div className="w-32">{props.children}</div>;
// };

export const TableHeadCustom = ({ ...props }) => {
  return (
    <div className={cn("flex items-center justify-center", props.className)}>
      <Button className="w-full" variant={"ghost"} onClick={props.onClick}>
        {props.children}
      </Button>
    </div>
  );
};

export const TableCellCustom = ({ ...props }) => {
  return <div className={cn("flex items-center justify-center", props.className)}>{props.children}</div>;
};

export const CommonTooltip = ({ ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent className="item-center flex justify-center">{props.tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
