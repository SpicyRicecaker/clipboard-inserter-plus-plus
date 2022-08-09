import { writable } from "svelte/store";
import { Mode } from './lib';

const storedOptions = localStorage.getItem("options");

export const options = writable(JSON.parse(storedOptions));

options.subscribe(value => {
  if (value) {
    localStorage.setItem("options", JSON.stringify(value));
  } else {
    localStorage.setItem("options", JSON.stringify({
      modes: [
        { mode: Mode.AddToTop, label: "Newest First" },
        { mode: Mode.AddToBottom, label: "Newest Last" },
      ],
      currentMode: Mode.AddToTop,
      persistHistory: false,
      showDate: false,
      // amount of time to scan clipboard
      updateInterval: 300,
    }));
  }
});