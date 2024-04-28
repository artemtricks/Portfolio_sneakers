export const getFavoriteFromLocalStorage = () => {
  const data = localStorage.getItem("favorite");
  const items = !!data ? JSON.parse(data) : [];

  return items;
};
