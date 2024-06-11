"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRaisedShadow } from "@/components/use-raised-shadow";
import { Reorder, useMotionValue } from "framer-motion";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, Clipboard, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, "Please write your activity")
    .max(64, "Your activity may not contain more than 64 characters"),
});

const defaultListItem = [
  {
    id: "0",
    content: "Cooking",
    status: "",
  },
  {
    id: "1",
    content: "Writing an essay",
    status: "",
  },
  {
    id: "2",
    content: "Daily commisions",
    status: "",
  },
];

interface IDefaultItem {
  id: string;
  content: string;
  status: string;
}

interface ITaskStatus {
  total: number;
  completed: number;
  canceled: number;
}

const ToDoListPage = () => {
  const initialRender = useRef(true);

  const [items, setItems] = useState<IDefaultItem[]>(defaultListItem);
  const [taskStatus, setTaskStatus] = useState<ITaskStatus>({
    total: 0,
    completed: 0,
    canceled: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let listFromLocalStorage = JSON.parse(localStorage.getItem("todolist")!);

      if (listFromLocalStorage) setItems(listFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const completedTask = items.filter((item) => {
      return item.status === "completed";
    }).length;

    const canceledTask = items.filter((item) => {
      return item.status === "killed";
    }).length;

    setTaskStatus({
      total: items.length,
      completed: completedTask,
      canceled: canceledTask,
    });

    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("todolist", JSON.stringify(items));
    }
  }, [items]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setItems([
      { ...data, id: Math.round(Math.random() * 1000).toString(), status: "" },
      ...items!,
    ]);

    form.reset();
  };

  const handleSelect = (id: string, action: string) => {
    const changeStatus = items?.map((item) =>
      item.id === id ? { ...item, status: action } : item
    );
    setItems(changeStatus);
  };

  const handleRemove = (itemStatus: string) => {
    const filteredItem = items.filter((item) => {
      return item.status !== itemStatus;
    });

    setItems(filteredItem);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col justify-start items-start space-y-12 w-full max-w-lg">
        <h1 className="font-black text-3xl tracking-tight text-primary">
          To Do List
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-start items-end space-y-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Your activity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div className="flex flex-col justify-start items-start w-full gap-y-6">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="link"
                    className="relative p-1 flex justify-center items-center text-xs h-max text-secondary-foreground hover:text-destructive"
                  >
                    <Check className="size-4" />
                    <Trash2 className="absolute size-2.5 bottom-0 right-0" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to clear all completed items?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all completed items.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRemove("completed")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="link"
                    className="relative p-1 flex justify-center items-center text-xs h-max text-secondary-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                    <Trash2 className="absolute size-2.5 bottom-0 right-0" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to clear all canceled items?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all canceled items.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemove("killed")}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex flex-row gap-1.5 text-xs">
              <Badge
                variant="secondary"
                className="flex gap-1.5 min-w-12 bg-primary/10 text-primary"
              >
                <Clipboard className="size-3" />
                {taskStatus.total}
              </Badge>
              <Badge
                variant="secondary"
                className="flex gap-1.5 min-w-12 bg-primary/10 text-primary"
              >
                <Check className="size-3" />
                {taskStatus.completed}
              </Badge>
              <Badge
                variant="secondary"
                className="flex gap-1.5 min-w-12 bg-primary/10 text-primary"
              >
                <X className="size-3" />
                {taskStatus.canceled}
              </Badge>
            </div>
          </div>
          <Separator />
          <Reorder.Group
            axis="y"
            onReorder={setItems}
            values={items}
            className="w-full font-medium space-y-2"
          >
            {items &&
              items.map((item) => {
                return (
                  <Item key={item.id} item={item} handleSelect={handleSelect} />
                );
              })}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};

export default ToDoListPage;

interface IItem {
  item: IDefaultItem;
  handleSelect: (id: string, action: string) => void;
}

const Item = ({ item, handleSelect }: IItem) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ boxShadow, y }}
      className={`flex flex-row justify-start items-center gap-x-2 sm:gap-x-4 w-full px-3 sm:px-6 py-2 sm:py-3 rounded border hover:cursor-grab active:cursor-grabbing ${
        item.status
          ? item.status === "completed"
            ? "bg-primary/20"
            : "bg-destructive/20"
          : "bg-secondary/20"
      }`}
    >
      <DragHandleDots2Icon className="size-8 text-muted-foreground/50" />
      <div className="flex flex-row justify-between items-center gap-x-4 w-full">
        <span className="text-sm">{item.content}</span>
        <ToggleGroup
          type="single"
          defaultValue={item.status}
          onValueChange={(value) => handleSelect(item.id, value)}
          className="gap-x-1"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="completed"
                  aria-label="Toggle complete"
                  className={`${
                    item.status === "completed" && "bg-primary/10 text-primary"
                  }`}
                  size="sm"
                >
                  <Check className="size-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Mark as <b className="text-primary">completed</b>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="killed"
                  aria-label="Toggle remove"
                  className={`${
                    item.status === "killed" &&
                    "bg-destructive/10 text-destructive"
                  }`}
                  size="sm"
                >
                  <X className="size-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Mark as <b className="text-destructive">canceled</b>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ToggleGroup>
      </div>
    </Reorder.Item>
  );
};
