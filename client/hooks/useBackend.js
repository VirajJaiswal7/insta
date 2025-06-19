export const useBackend = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  return { BackendUrl };
};
