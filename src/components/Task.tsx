
import React from "react";
import { Check, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  inProgress: boolean;
};

interface TaskProps {
  task: TaskType;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Task({ task, onStart, onComplete, onDelete }: TaskProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 mb-3 border-2 border-black",
        task.completed
          ? "bg-pixel-lightGray"
          : task.inProgress
          ? "bg-pixel-blue animate-pixel-step"
          : "bg-white"
      )}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {task.completed ? (
            <button
              className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center"
              onClick={() => onComplete(task.id)}
            >
              <Check size={14} className="text-white" />
            </button>
          ) : (
            <button
              className="w-6 h-6 border-2 border-black bg-white"
              onClick={() => onComplete(task.id)}
            />
          )}
        </div>
        <span
          className={cn(
            "font-pixel text-sm",
            task.completed ? "line-through text-pixel-gray" : "text-pixel-dark"
          )}
        >
          {task.title}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-none border-2 border-black",
            task.inProgress ? "bg-pixel-blue text-white" : "bg-white text-pixel-dark"
          )}
          onClick={() => onStart(task.id)}
          disabled={task.completed || task.inProgress}
        >
          <Clock size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-none bg-white hover:bg-red-50 hover:text-red-500 border-2 border-black"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
