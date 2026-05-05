"use client";

import { motion } from "framer-motion";
import { CreativeTask } from "@/lib/tasks";
import { TaskCard } from "@/components/TaskCard";

type TimePointProps = {
  hour: string;
  tasks: CreativeTask[];
  onDropFlex: (hour: string) => void;
  onTaskClick: (taskId: string) => void;
  onDragStart: (taskId: string) => void;
};

export function TimePoint({
  hour,
  tasks,
  onDropFlex,
  onTaskClick,
  onDragStart,
}: TimePointProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-[64px_1fr] gap-3"
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDropFlex(hour)}
    >
      <div className="pt-3 text-xs font-semibold text-slate-500">{hour}</div>
      <div className="relative min-h-24 rounded-[22px] border border-white/48 bg-white/26 p-3 backdrop-blur-xl">
        <span className="absolute left-0 top-5 h-px w-full bg-white/55" />
        <div className="relative space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              compact
              onClick={() => onTaskClick(task.id)}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
