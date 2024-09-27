import { useAtom, atom } from "jotai";

const loadingAtom = atom(false);

export function useLoading() {
  const used = useAtom(loadingAtom);
  return used;
}
