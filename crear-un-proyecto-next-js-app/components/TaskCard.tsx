"use client";

import { motion } from "framer-motion";
import { Clock3, Sparkles } from "lucide-react";
import { CreativeTask } from "@/lib/tasks";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: CreativeTask;
  compact?: boolean;
  draggable?: boolean;
  onDragStart?: (taskId: string) => void;
  onClick?: () => void;
};

export function TaskCard({
  task,
  compact = false,
  draggable = true,
  onDragStart,
  onClick,
}: TaskCardProps) {
  return (
    <motion.button
      type="button"
      layout
      draggable={draggable}
      onDragStart={() => onDragStart?.(task.id)}
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group w-full rounded-[20px] border border-white/55 bg-white/48 p-4 text-left shadow-[0_16px_38px_rgba(31,45,71,0.11)] outline-none backdrop-blur-2xl transition-colors hover:bg-white/62",
        compact && "rounded-2xl p-3",
      )}
      style={{
        background: `linear-gradient(135deg, ${task.color}66, rgba(255,255,255,0.58))`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={cn(
              "truncate font-semibold leading-tight text-slate-950",
              compact ? "text-sm" : "text-base",
            )}
          >
            {task.title}
          </p>
          <p className="mt-1 truncate text-xs text-slate-600">{task.client}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/45 text-slate-700 backdrop-blur-xl">
          {task.status === "time" ? (
            <Clock3 className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-700">
        <span>{task.status === "time" ? task.time : "FLEX"}</span>
        <span>Dia {task.day}</span>
      </div>
    </motion.button>
  );
}
