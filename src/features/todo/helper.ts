export const getColorBadge = (priority: string): string => {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-600";
    case "medium":
      return "bg-yellow-50 text-yellow-600";
    default:
      return "bg-green-50 text-green-600";
  }
};

export const getProgressCount = (progress: string): number => {
  switch (progress) {
    case "todo":
      return 0;
    case "in progress":
      return 50;
    default:
      return 100;
  }
};
