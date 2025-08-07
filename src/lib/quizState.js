// Mock persistent quiz state – in real app, this could come from DB
export const getQuizStatus = () => {
  // Example: only Stage 1 and 2 passed
  return {
    1: true,
    2: true,
    3: false,
    4: false,
  };
};
