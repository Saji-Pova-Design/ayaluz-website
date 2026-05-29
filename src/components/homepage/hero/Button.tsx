import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/shared/banner/ArrowIcon";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
  showTrailingArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  openInNewTab?: boolean;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-green text-light shadow-[0_4px_20px_rgba(43,74,64,0.25)] hover:bg-primary-green-hover hover:shadow-[0_6px_24px_rgba(31,58,50,0.35)]",
  secondary:
    "border border-light/70 bg-transparent text-light hover:bg-light/10 hover:border-light",
  text: "text-light underline-offset-4 hover:underline bg-transparent px-0 py-0 min-h-0",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    leadingIcon,
    showTrailingArrow = false,
    className = "",
    children,
  } = props;

  const base =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[8px] px-6 py-3 font-canela text-[15px] tracking-[0.02em] transition-all duration-300 ease-out";

  const classes = `${base} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {showTrailingArrow ? <ArrowIcon /> : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.openInNewTab ? "_blank" : undefined}
        rel={props.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
