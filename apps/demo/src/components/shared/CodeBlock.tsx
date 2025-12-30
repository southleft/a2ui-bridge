import { Highlight, themes } from 'prism-react-renderer';
import { ReactNode } from 'react';

interface CodeBlockProps {
  code: string;
  language: 'typescript' | 'tsx' | 'jsx' | 'javascript' | 'json' | 'bash';
  label?: string;
  className?: string;
  headerRight?: ReactNode;
  showWindowControls?: boolean;
}

export function CodeBlock({
  code,
  language,
  label,
  className = '',
  headerRight,
  showWindowControls = false,
}: CodeBlockProps) {
  // Map friendly names to Prism language identifiers
  const prismLanguage = language === 'typescript' ? 'tsx' : language;

  return (
    <div className={`rounded-sm border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-lg ${className}`}>
      {(label || headerRight || showWindowControls) && (
        <div className="px-5 py-3 bg-[#161b22] border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">{label}</span>
          {showWindowControls ? (
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
          ) : headerRight}
        </div>
      )}
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={prismLanguage}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${highlightClassName} text-base p-5 font-mono overflow-x-auto leading-relaxed`}
            style={{ ...style, background: 'transparent', margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default CodeBlock;
