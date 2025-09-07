export const formatNumber = (num) => {
    return num.toLocaleString("en-US");
}

export const sparklineResult = (sparklineData) => {

    const prices = sparklineData;
    const start = prices[0];
    const end = prices[prices.length - 1];

    const sparklinePositive = end >= start;
    return sparklinePositive
}

export const formatTime = (isoString) => {
    if (!isoString) return "-";
  
    return new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }