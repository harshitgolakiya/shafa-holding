"use client";

type ConfirmButtonProps = {
  action: () => Promise<void>;
  message: string;
  className: string;
  children: React.ReactNode;
};

export function ConfirmButton({ action, message, className, children }: ConfirmButtonProps) {
  return (
    <form action={action} onSubmit={(event) => { if (!window.confirm(message)) event.preventDefault(); }} className="contents">
      <button type="submit" className={className}>{children}</button>
    </form>
  );
}
