import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircle } from "@/components/icons/common";

export const TableCellTooltip = ({ ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>{props.tip}</TooltipContent>
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
            <InfoCircle className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const TableHeadCustom = ({ ...props }) => {
  return <div className="w-32">{props.children}</div>;
};
