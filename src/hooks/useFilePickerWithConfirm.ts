import { useRef, useCallback } from "react";

type UseFilePickerWithConfirmProps = {
  onChange: (files: FileList | null) => void;
  confirmMessage?: string;
};

export function useFilePickerWithConfirm({
  onChange,
  confirmMessage = "파일을 업로드하시겠습니까?",
}: UseFilePickerWithConfirmProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelect = useCallback(() => {
    if (confirm(confirmMessage)) {
      inputRef.current?.click();
    }
  }, [confirmMessage]);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files);
    },
    [onChange]
  );

  return {
    inputRef,
    triggerFileSelect,
    onFileChange,
  };
}
