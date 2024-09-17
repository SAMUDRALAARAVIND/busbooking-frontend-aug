//format Date
export const formatDate = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    return `${day} ${month}`;
  };
  //  format time
  export const formatTime = (epochTime) => {
    const date = new Date(epochTime * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };