"use client";

import GitHubButton from "react-github-btn";

export function GitHubIssueButton({
  size = "large",
  showCount = true,
}: {
  size?: "large" | "small";
  showCount?: boolean;
}) {
  return (
    <GitHubButton
      href="https://github.com/Mohith-Kumar28/invoice-lab/issues"
      data-color-scheme="no-preference: light; light: light; dark: dark;"
      data-size={size}
      data-show-count={showCount ? "true" : "false"}
      aria-label="Issue Mohith-Kumar28/invoice-lab on GitHub"
    >
      Issue
    </GitHubButton>
  );
}
