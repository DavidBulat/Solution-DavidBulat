export type ProductReturnState = {
  returnTo: string;
};

export function getProductReturnTo(pathname: string, search: string) {
  return `${pathname}${search}`;
}

export function getReturnToFromState(state: unknown) {
  if (
    state &&
    typeof state === "object" &&
    "returnTo" in state &&
    typeof state.returnTo === "string"
  ) {
    return state.returnTo;
  }

  return "/";
}
