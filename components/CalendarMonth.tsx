"use client";

import { motion } from "framer-motion";
import { CreativeTask, monthDays } from "@/lib/tasks";
import { TaskCard } from "@/components/TaskCard";

type CalendarMonthProps = {
  tasks: CreativeTask[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onDragStart: (taskId: string) => void;
  onDropFlex: (day: number) => void;
};

export function CalendarMonth({
  tasks,
  selectedDay,
  onSelectDay,
  onDragStart,
  onDropFlex,
}: CalendarMonthProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
    >
      {monthDays.map((day) => {
        const dayTasks = tasks.filter((task) => task.day === day);
        return (
          <motion.div
            key={day}
            role="button"
            tabIndex={0}
            layout
            onClick={() => onSelectDay(day)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onSelectDay(day);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => onDropFlex(day)}
            whileHover={{ y: -4 }}
            className="glass-soft min-h-44 rounded-[24px] p-3 text-left outline-none"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{day}</span>
              {selectedDay === day ? (
                <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              ) : null}
            </div>
            <div className="space-y-2">
              {dayTasks.slice(0, 2).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  compact
                  onDragStart={onDragStart}
                />
              ))}
              {dayTasks.length > 2 ? (
                <p className="px-1 text-xs font-medium text-slate-500">
                  +{dayTasks.length - 2}
                </p>
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
