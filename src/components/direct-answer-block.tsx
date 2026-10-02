import { Icon } from "@/components/icons";

type DirectAnswerBlockProps = {
  question: string;
  answer: string;
};

export function DirectAnswerBlock({ question, answer }: DirectAnswerBlockProps) {
  if (!answer) return null;

  return (
    <aside
      aria-label={question}
      className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-brand-50/40 p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-brand-500 text-white shadow-sm shadow-brand-500/25">
          <Icon name="spark" className="size-4" />
        </span>
        <div className="space-y-2">
          <h2 className="text-sm font-black text-ink-950 sm:text-base">
            {question}
          </h2>
          <p className="text-xs leading-7 text-slate-700 sm:text-sm sm:leading-8">
            {answer}
          </p>
        </div>
      </div>
    </aside>
  );
}
