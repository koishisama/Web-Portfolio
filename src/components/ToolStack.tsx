type ToolStackProps = {
  tools: readonly string[] | string[];
};

export default function ToolStack({ tools }: ToolStackProps) {
  return (
    <div className="tool-stack" aria-label="Tool stack">
      {tools.map((tool) => (
        <span key={tool}>{tool}</span>
      ))}
    </div>
  );
}
