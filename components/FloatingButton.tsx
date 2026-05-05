"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type FloatingButtonProps = {
  onClick: () => void;
};

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-30"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.92 }}
    >
      <Button
        aria-label="Crear tarea"
        size="icon"
        className="h-14 w-14 bg-slate-950 text-white shadow-[0_22px_50px_rgba(15,23,42,0.26)] hover:bg-slate-800"
        onClick={onClick}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}
