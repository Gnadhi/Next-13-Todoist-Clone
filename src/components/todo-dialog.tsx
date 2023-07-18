"use client";

import { useRouter } from "next/navigation";

import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TodoItem } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@radix-ui/react-select";

export function TodoDialog({
  todo: { id, description, isCompleted, dueDate, name, priority },
}: {
  todo: TodoItem;
}) {
  const router = useRouter();

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-2xl" onClose={() => router.back()}>
        <div className="flex flex-row justify-between m-8 space-x-6">
          <div>
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() => {}}
              aria-label="Select all"
              className="translate-y-[2px] h-7 w-7"
            />
          </div>
          <div className="flex-1 space-y-4">
            <Input
              className="peer"
              autoFocus={false}
              id="description"
              defaultValue={name}
              placeholder="Description"
            />
            <Textarea
              defaultValue={description || ""}
              className="peer"
              rows={5}
              id="description"
              placeholder="Please include all information relevant to your issue."
            />
            <div className="invisible peer-focus:visible space-x-2 flex flex-row justify-end">
              <Button variant={"ghost"}>Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>

          <Separator orientation="vertical" />
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="dueDate" className="text-muted-foreground">
                Due Date
              </Label>
              <DatePicker defaultValue={dueDate} />
            </div>
            <Separator orientation="horizontal" />

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dueDate" className="text-muted-foreground ">
                Priority
              </Label>
              <Select>
                <SelectTrigger>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    dfdf
                  </Button>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
