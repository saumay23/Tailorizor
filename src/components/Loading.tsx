import { cn } from "@/lib/utils";

export interface ISVGProps
  extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  message?: string; // New optional message prop
}

const Loading =
  ({
    size = 24,
    className,
    message = " Loading....",
    ...props
  }: ISVGProps) => {
    return (
      <div className="flex items-center flex-col space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={
            size
          }
          height={
            size
          }
          {...props}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "animate-spin",
            className
          )}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="text-center font-[family-name:var(--font-arkhip-regular)] text-lg">
          {
            message
          }
        </span>
      </div>
    );
  };

export default Loading;
