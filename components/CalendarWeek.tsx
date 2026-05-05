"use client";

import { motion } from "framer-motion";
import { CreativeTask, weekDays } from "@/lib/tasks";
import { TaskCard } from "@/components/TaskCard";

type CalendarWeekProps = {
  tasks: CreativeTask[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onDragStart: (taskId: string) => void;
  onDropFlex: (day: number) => void;
};

export function CalendarWeek({
  tasks,
  selectedDay,
  onSelectDay,
  onDragStart,
  onDropFlex,
}: CalendarWeekProps) {
  return (
    <motion.div layout className="grid gap-3 md:grid-cols-7">
      {weekDays.map(({ label, day }) => {
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
            className="glass-soft min-h-80 rounded-[24px] p-4 text-left outline-none"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="text-2xl font-semibold text-slate-950">{day}</p>
              </div>
              {selectedDay === day ? (
                <span className="h-3 w-3 rounded-full bg-slate-950" />
              ) : null}
            </div>
            <div className="space-y-3">
              {dayTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  compact
                  onDragStart={onDragStart}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
