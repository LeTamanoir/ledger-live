import { useRef } from "react";

export function useCopyToClipboard(callback?: (text: string) => void) {
  const onCopyRef = useRef<() => void>();

  return (text: string) => {
    if (!onCopyRef.current) {
      onCopyRef.current = () => {
        navigator.clipboard.writeText(text).then(() => {
          callback?.(text);
        });
      };
    }
    return onCopyRef.current;
  };
}
