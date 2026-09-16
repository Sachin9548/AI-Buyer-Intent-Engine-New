import { toast } from "sonner";

const base = "!glass !rounded-xl !text-[#F5F7FA] !font-sans !text-sm";

export const cvToast = {
  info: (message: string, description?: string) =>
    toast(message, { description, className: `${base} !border-l-2 !border-l-[#7C6CFF]` }),
  success: (message: string, description?: string, undo?: () => void) =>
    toast.success(message, {
      description,
      className: `${base} !border-l-2 !border-l-[#34D399]`,
      action: undo ? { label: "Undo", onClick: undo } : undefined,
    }),
  error: (message: string, description?: string) =>
    toast.error(message, {
      description,
      className: `${base} !border-l-2 !border-l-[#F87171]`,
    }),
};
