export const formatDA = (value) =>
  `${Number(value || 0).toLocaleString("fr-FR")} DA`;

export const formatQuantity = (value) =>
  `${Number(value || 0).toLocaleString("fr-FR")}`;

export const nowLabel = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} à ${hour}:${min}`;
};
