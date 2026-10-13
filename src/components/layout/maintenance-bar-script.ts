// localStorage key remembering that the visitor closed the maintenance bar.
export const BAR_CLOSED_KEY = "ao-bar-closed";

// Runs in <head> before the first paint, so a closed bar never flashes back on the next visit.
export const barClosedScript = `try{if(localStorage.getItem("${BAR_CLOSED_KEY}"))document.documentElement.setAttribute("data-bar-closed","")}catch(e){}`;
