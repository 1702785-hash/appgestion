"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Columns3, Rows3 } from "lucide-react";
import { CalendarMonth } from "@/components/CalendarMonth";
import { CalendarWeek } from "@/components/CalendarWeek";
import { DayView } from "@/components/DayView";
import { FloatingButton } from "@/components/FloatingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreativeTask, initialTasks } from "@/lib/tasks";
import { cn } from "@/lib/utils";

type ViewMode = "month" | "week" | "day";

const views: Array<{
  id: ViewMode;
  label: string;
  icon: typeof CalendarDays;
}> = [
  { id: "month", label: "Mes", icon: CalendarDays },
  { id: "week", label: "Semana", icon: Columns3 },
  { id: "day", label: "Dia", icon: Rows3 },
];

export default function Home() {
  const [view, setView] = useState<ViewMode>("month");
  const [selectedDay, setSelectedDay] = useState(10);
  const [tasks, setTasks] = useState<CreativeTask[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const viewTitle = useMemo(() => {
    if (view === "month") return "Mayo creativo";
    if (view === "week") return "Semana activa";
    return `Dia ${selectedDay}`;
  }, [selectedDay, view]);

  function createFlexTask() {
    const palette = ["#8fd7ff", "#ffc1d8", "#b7f3c9", "#f9dd8f", "#c9b6ff"];
    const nextIndex = tasks.length + 1;

    setTasks((currentTasks) => [
      {
        id: `t-${Date.now()}`,
        title: `Nueva pieza ${nextIndex}`,
        day: selectedDay,
        client: "Proyecto libre",
        color: palette[nextIndex % palette.length],
        status: "flex",
      },
      ...currentTasks,
    ]);
    setView("day");
  }

  function convertFlexToTime(day: number, time = "18:00") {
    if (!draggedTaskId) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== draggedTaskId || task.status !== "flex") return task;

        return {
          ...task,
          day,
          status: "time",
          time,
        };
      }),
    );
    setSelectedDay(day);
    setDraggedTaskId(null);
  }

  function convertTimeToFlex(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId || task.status !== "time") return task;

        const { time: _time, ...flexTask } = task;
        return {
          ...flexTask,
          status: "flex",
        };
      }),
    );
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-semibold text-slate-500">
              gestor-creativo
            </p>
            <h1 className="mt-1 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
              {viewTitle}
            </h1>
          </motion.div>

          <Card className="w-full rounded-full md:w-auto">
            <CardContent className="flex gap-2 p-2">
              {views.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={active ? "default" : "ghost"}
                    className={cn(
                      "flex-1 rounded-full md:flex-none",
                      active && "shadow-[0_14px_30px_rgba(15,23,42,0.2)]",
                    )}
                    onClick={() => setView(item.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={view}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {view === "month" ? (
              <CalendarMonth
                tasks={tasks}
                selectedDay={selectedDay}
                onSelectDay={(day) => {
                  setSelectedDay(day);
                  setView("day");
                }}
                onDragStart={setDraggedTaskId}
                onDropFlex={(day) => convertFlexToTime(day)}
              />
            ) : null}

            {view === "week" ? (
              <CalendarWeek
                tasks={tasks}
                selectedDay={selectedDay}
                onSelectDay={(day) => {
                  setSelectedDay(day);
                  setView("day");
                }}
                onDragStart={setDraggedTaskId}
                onDropFlex={(day) => convertFlexToTime(day)}
              />
            ) : null}

            {view === "day" ? (
              <DayView
                tasks={tasks}
                day={selectedDay}
                onDragStart={setDraggedTaskId}
                onDropFlex={(hour) => convertFlexToTime(selectedDay, hour)}
                onTaskClick={convertTimeToFlex}
              />
            ) : null}
          </motion.section>
        </AnimatePresence>
      </div>

      <FloatingButton onClick={createFlexTask} />
    </main>
  );
}
