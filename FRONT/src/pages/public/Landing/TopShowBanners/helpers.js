export const divideDataForLayout = (data) => {
  const count = data.length;

  const amount = count > 15 ? 3 : count > 6 ? 2 : 1;

  const groups = Array.from({ length: amount }, () => []);

  const base = Math.floor(count / amount);
  const extra = count % amount;

  let index = 0;

  for (let i = 0; i < amount; i++) {
    const size = base + (i < extra ? 1 : 0);
    groups[i] = data.slice(index, index + size);
    index += size;
  }

  const speeds = Array.from({ length: amount }, () => {
    return 15 + (Math.random() * 1.2 - 0.6);
  });

  return { groups, speeds };
};
