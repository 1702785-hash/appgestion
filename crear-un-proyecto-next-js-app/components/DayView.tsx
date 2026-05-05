"use client";

import { motion } from "framer-motion";
import { CreativeTask, timelineHours } from "@/lib/tasks";
import { TaskCard } from "@/components/TaskCard";
import { TimePoint } from "@/components/TimePoint";

type DayViewProps = {
  tasks: CreativeTask[];
  day: number;
  onDragStart: (taskId: string) => void;
  onDropFlex: (hour: string) => void;
  onTaskClick: (taskId: string) => void;
};

export function DayView({
  tasks,
  day,
  onDragStart,
  onDropFlex,
  onTaskClick,
}: DayViewProps) {
  const dayTasks = tasks.filter((task) => task.day === day);
  const flexTasks = dayTasks.filter((task) => task.status === "flex");

  return (
    <motion.div layout className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <section className="glass-soft rounded-[26px] p-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Dia
            </p>
            <h2 className="text-5xl font-semibold text-slate-950">{day}</h2>
          </div>
          <p className="pb-1 text-sm font-medium text-slate-500">
            {flexTasks.length} flex
          </p>
        </div>
        <div className="space-y-3">
          {flexTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
          ))}
          {flexTasks.length === 0 ? (
            <div className="rounded-[22px] border border-white/50 bg-white/28 p-8 text-center text-sm font-medium text-slate-500">
              Sin flex
            </div>
          ) : null}
        </div>
      </section>

      <section className="glass rounded-[28px] p-4 sm:p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Timeline</h2>
          <span className="rounded-full border border-white/50 bg-white/34 px-3 py-1 text-xs font-medium text-slate-500 backdrop-blur-xl">
            TIME
          </span>
        </div>
        <div className="space-y-4">
          {timelineHours.map((hour) => (
            <TimePoint
              key={hour}
              hour={hour}
              tasks={dayTasks.filter(
                (task) => task.status === "time" && task.time === hour,
              )}
              onDropFlex={onDropFlex}
              onTaskClick={onTaskClick}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
