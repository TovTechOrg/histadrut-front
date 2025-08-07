// Text formatting helper functions

export const capitalizeName = (name) => {
  if (!name) return name;
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
