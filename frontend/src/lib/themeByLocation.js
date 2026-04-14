export const getThemeByTime = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 10 && hour < 12) {
    return "light";
  }

  return "dark";
};

export const isSouthIndia = (state) => {
  const southStates = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana"
  ];

  return southStates.includes(state);
};