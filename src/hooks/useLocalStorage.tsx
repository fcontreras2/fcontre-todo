import { useEffect } from "react";

const useLocalStorage = <T extends object>(key: string, value?: T) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  const getValue = () => {
    try {
      const value = window.localStorage.getItem(key);
      return JSON.parse(value as string);
    } catch (e) {
      return null;
    }
  };

  return {
    getValue,
  };
};

export default useLocalStorage;
