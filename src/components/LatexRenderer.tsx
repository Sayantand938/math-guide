// src\components\LatexRenderer.tsx
import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexRendererProps {
  text: string;
}

// Renders text with LaTeX syntax, supporting both inline ($...$) and block ($$...$$) math
const LatexRenderer: React.FC<LatexRendererProps> = ({ text }) => {
  if (!text) return null;

  // Split into block math vs non-block math segments
  const blockParts = text.split('$$');

  return (
    <>
      {blockParts.map((blockPart, i) => {
        // Odd indices → block math
        if (i % 2 === 1) {
          return <BlockMath key={i} math={blockPart} />;
        } else {
          // Even indices → normal text with possible inline math
          const inlineParts = blockPart.split('$');
          return (
            <React.Fragment key={i}>
              {inlineParts.map((inlinePart, j) => {
                // Odd indices → inline math
                if (j % 2 === 1) {
                  return <InlineMath key={j} math={inlinePart} />;
                } else {
                  return <span key={j}>{inlinePart}</span>;
                }
              })}
            </React.Fragment>
          );
        }
      })}
    </>
  );
};

export default LatexRenderer;
