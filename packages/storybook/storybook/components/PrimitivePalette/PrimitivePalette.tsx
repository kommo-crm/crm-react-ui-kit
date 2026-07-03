import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Token, ColorShade } from '@tokens/primitives';
import { i18n } from '@i18n';
import { copyText } from '@storybook-utils/utils/copy';
import { getContrastColor } from '@storybook-utils/utils/getContrastColor';

interface ColorGroup {
  name: string;
  shades: Array<{ shade: ColorShade; token: Token }>;
}

interface Props {
  groups: ColorGroup[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

const COLOR_GROUP_ORDER = [
  'azure',
  'blue',
  'green',
  'orange',
  'red',
  'pink',
  'purple',
  'neutral',
];

const LABEL_WIDTH = 80;
const SWATCH_HEIGHT = 48;

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 4,
};

const labelCellStyle: React.CSSProperties = {
  width: LABEL_WIDTH,
  flexShrink: 0,
  height: SWATCH_HEIGHT,
  display: 'flex',
  alignItems: 'center',
};

const shadeCellStyle: React.CSSProperties = {
  flex: 1,
  minWidth: SWATCH_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '0 2px',
};

const styles: Record<string, React.CSSProperties> = {
  root: {
    padding: '24px 32px',
    fontFamily: 'PT Sans, sans-serif',
    color: 'var(--crm-ui-kit-palette-text-primary)',
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: 700,
    opacity: 0.5,
    textAlign: 'center',
    paddingBottom: 6,
    letterSpacing: '0.04em',
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.7,
  },
  swatch: {
    height: SWATCH_HEIGHT,
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'filter 0.15s, outline 0.1s',
    userSelect: 'none',
  },
  hexLabel: {
    textAlign: 'center',
    fontSize: 10,
    opacity: 0.55,
    marginTop: 3,
    letterSpacing: '0.02em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tooltip: {
    position: 'fixed',
    background: 'rgba(0,0,0,0.82)',
    color: '#fff',
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 4,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 9999,
    transform: 'translate(-50%, -140%)',
  },
};

function useTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleShow = useCallback((e: React.MouseEvent, text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTooltip({ visible: true, x: e.clientX, y: e.clientY, text });
    timeoutRef.current = setTimeout(() => {
      setTooltip((t) => ({ ...t, visible: false }));
    }, 1800);
  }, []);

  return { tooltip, handleShow };
}

interface SwatchProps {
  token: Token;
  onShow: (e: React.MouseEvent, text: string) => void;
}

function Swatch({ token, onShow }: SwatchProps) {
  const [hovered, setHovered] = useState(false);
  const [hexHovered, setHexHovered] = useState(false);

  const textColor = getContrastColor(token.value);

  const handleSwatchClick = useCallback(
    async (e: React.MouseEvent) => {
      try {
        await copyText(token.cssVar);
        onShow(e, `${i18n.t('Copied')}: ${token.cssVar}`);
      } catch {
        onShow(e, i18n.t('Copy failed'));
      }
    },
    [token.cssVar, onShow]
  );

  const handleHexClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await copyText(token.value);
        onShow(e, `${i18n.t('Copied')}: ${token.value}`);
      } catch {
        onShow(e, i18n.t('Copy failed'));
      }
    },
    [token.value, onShow]
  );

  return (
    <>
      <div
        style={{
          ...styles.swatch,
          background: token.value,
          filter: hovered ? 'brightness(1.1)' : 'none',
          outline: hovered
            ? `2px solid ${textColor}40`
            : '2px solid transparent',
          outlineOffset: 2,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleSwatchClick}
      />
      <div
        style={{
          ...styles.hexLabel,
          cursor: 'pointer',
          textDecoration: hexHovered ? 'underline' : 'none',
        }}
        onMouseEnter={() => setHexHovered(true)}
        onMouseLeave={() => setHexHovered(false)}
        onClick={handleHexClick}
      >
        {token.value}
      </div>
    </>
  );
}

export function PrimitivePalette({ groups }: Props) {
  const { tooltip, handleShow } = useTooltip();

  const sortedGroups = [...groups].sort((a, b) => {
    const ai = COLOR_GROUP_ORDER.indexOf(a.name);
    const bi = COLOR_GROUP_ORDER.indexOf(b.name);

    if (ai === -1 && bi === -1) {
      return 0;
    }

    if (ai === -1) {
      return 1;
    }

    if (bi === -1) {
      return -1;
    }

    return ai - bi;
  });

  const allShades = [
    ...new Set(sortedGroups.flatMap((g) => g.shades.map((s) => s.shade))),
  ].sort((a, b) => Number(a) - Number(b));

  const shadeMap = (group: ColorGroup) =>
    Object.fromEntries(group.shades.map(({ shade, token }) => [shade, token]));

  return (
    <div style={styles.root}>
      <div style={rowStyle}>
        <div style={{ ...labelCellStyle, height: 'auto' }} />
        {allShades.map((shade) => (
          <div key={shade} style={shadeCellStyle}>
            <div style={styles.headerLabel}>{shade}</div>
          </div>
        ))}
      </div>

      {sortedGroups.map((group) => {
        const map = shadeMap(group);

        return (
          <div key={group.name} style={{ ...rowStyle, marginBottom: 12 }}>
            <div style={labelCellStyle}>
              <span style={styles.rowLabel}>{group.name}</span>
            </div>
            {allShades.map((shade) => {
              const token = map[shade];

              return (
                <div key={shade} style={shadeCellStyle}>
                  {token ? <Swatch token={token} onShow={handleShow} /> : null}
                </div>
              );
            })}
          </div>
        );
      })}

      {tooltip.visible && (
        <div style={{ ...styles.tooltip, left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
