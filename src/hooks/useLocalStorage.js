import { useState, useEffect } from "react";

// Custom hook: works like useState, but keeps the value in Local Storage
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked - app still works, just without saving
    }
  }, [key, value]);

  return [value, setValue];
}
