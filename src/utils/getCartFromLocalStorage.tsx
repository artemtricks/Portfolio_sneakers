export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = !!data ? JSON.parse(data) : [];

  return items;
};
