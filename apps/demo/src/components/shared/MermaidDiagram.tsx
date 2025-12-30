import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with custom theme - optimized for readability
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    // Primary colors - dark text for readability
    primaryColor: '#e0f2fe',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#0284c7',
    lineColor: '#64748b',
    secondaryColor: '#f0fdf4',
    tertiaryColor: '#fef3c7',
    background: '#ffffff',
    mainBkg: '#e0f2fe',
    secondBkg: '#f0f9ff',
    border1: '#94a3b8',
    border2: '#64748b',
    arrowheadColor: '#475569',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '16px',
    nodeBorder: '#0284c7',
    clusterBkg: '#f1f5f9',
    clusterBorder: '#cbd5e1',
    edgeLabelBackground: '#ffffff',
    // Text colors for better contrast
    textColor: '#1e293b',
    nodeTextColor: '#1e293b',
    actorTextColor: '#1e293b',
    signalTextColor: '#1e293b',
    labelTextColor: '#374151',
    loopTextColor: '#1e293b',
    noteBkgColor: '#fef9c3',
    noteTextColor: '#1e293b',
    noteBorderColor: '#eab308',
    activationBorderColor: '#0284c7',
    sequenceNumberColor: '#ffffff',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 80,
  },
  sequence: {
    diagramMarginX: 30,
    diagramMarginY: 20,
    actorMargin: 80,
    width: 180,
    height: 50,
    boxMargin: 15,
    boxTextMargin: 8,
    noteMargin: 15,
    messageMargin: 45,
    mirrorActors: false,
    showSequenceNumbers: false,
  },
});

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container flex justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidDiagram;
