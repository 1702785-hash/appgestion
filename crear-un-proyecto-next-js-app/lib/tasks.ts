export type TaskStatus = "flex" | "time";

export type CreativeTask = {
  id: string;
  title: string;
  day: number;
  client: string;
  color: string;
  status: TaskStatus;
  time?: string;
};

export const monthDays = Array.from({ length: 30 }, (_, index) => index + 1);

export const weekDays = [
  { label: "Lun", day: 9 },
  { label: "Mar", day: 10 },
  { label: "Mie", day: 11 },
  { label: "Jue", day: 12 },
  { label: "Vie", day: 13 },
  { label: "Sab", day: 14 },
  { label: "Dom", day: 15 },
];

export const timelineHours = [
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "18:00",
  "20:00",
];

export const initialTasks: CreativeTask[] = [
  {
    id: "t-1",
    title: "Moodboard visual",
    day: 4,
    client: "Luma Studio",
    color: "#8fd7ff",
    status: "flex",
  },
  {
    id: "t-2",
    title: "Piezas campaña",
    day: 9,
    client: "Casa Norte",
    color: "#ffc1d8",
    status: "time",
    time: "11:00",
  },
  {
    id: "t-3",
    title: "Reels producto",
    day: 10,
    client: "Mercurio",
    color: "#b7f3c9",
    status: "flex",
  },
  {
    id: "t-4",
    title: "Landing concepto",
    day: 12,
    client: "Aurea",
    color: "#f9dd8f",
    status: "time",
    time: "18:00",
  },
  {
    id: "t-5",
    title: "Direccion de arte",
    day: 15,
    client: "Bruma Lab",
    color: "#c9b6ff",
    status: "flex",
  },
];
