export function currentUsageLoaded(usage) {
  return {
    type: "CURRENT_USAGE_LOADED",
    value: usage,
  };
}
