const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

type EmailLinkTextProps = {
  text: string;
  className?: string;
};

export function EmailLinkText({ text, className = 'text-[#f2d78b] hover:text-[#f7efdb]' }: EmailLinkTextProps) {
  const parts = text.split(emailPattern);
  const emails = text.match(emailPattern) ?? [];

  if (!emails.length) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const email = emails[index];

        return (
          <span key={`${part}-${index}`}>
            {part}
            {email ? (
              <a href={`mailto:${email}`} className={className}>
                {email}
              </a>
            ) : null}
          </span>
        );
      })}
    </>
  );
}
