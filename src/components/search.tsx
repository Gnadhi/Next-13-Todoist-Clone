import { Input } from "@/components/ui/input";

export function Search({ ...props }: React.ComponentPropsWithoutRef<"input">) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        {...props}
      />
    </div>
  );
}
