export const loadImage = async function (condition, imgClass) {
  try {
    const imgIcon = document.querySelector(imgClass);
    const icon = await import(`./weather-icons/${condition}.svg`);
    imgIcon.src = icon.default;
    imgIcon.alt = `${condition} icon`;
  } catch (error) {
    console.error(`Image failed to load... ${error}`);
  }
};

export const dayOfWeek = function (date, locale) {
  const day = new Date(`${date}T00:00`);
  const dayOfWeek = day.toLocaleString(locale, { weekday: "short" });
  return dayOfWeek;
};

export const dayAndMonth = function (date, locale) {
  const day = new Date(`${date}T00:00`);
  const finalDate = day.toLocaleString(locale, {
    month: "short",
    day: "numeric",
  });
  return finalDate;
};
