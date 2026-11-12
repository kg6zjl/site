/**
 * Mermaid Dark Theme Configuration
 * Matches the design tokens exactly.
 * Used by astro-mermaid integration.
 */

export const mermaidConfig = {
  theme: 'base',
  themeVariables: {
    /* Backgrounds */
    background: '#0c1014',           // --bg
    primaryColor: '#121820',         // --bg-soft (nodes)
    primaryBorderColor: '#71b7ff',   // --accent
    primaryTextColor: '#e7edf3',     // --ink
    secondaryColor: '#18202a',       // --bg-raised
    secondaryBorderColor: '#2a3542', // --line-soft
    secondaryTextColor: '#e7edf3',   // --ink
    tertiaryColor: '#1e2731',        // --line
    tertiaryBorderColor: '#71b7ff',  // --accent
    tertiaryTextColor: '#e7edf3',    // --ink

    /* Lines & edges */
    lineColor: '#2a3542',            // --line-soft
    textColor: '#e7edf3',            // --ink
    mainBkg: '#0c1014',              // --bg
    secondBkg: '#121820',            // --bg-soft
    tertiaryBkg: '#18202a',          // --bg-raised

    /* Clusters */
    clusterBkg: '#121820',           // --bg-soft
    clusterBorder: '#1e2731',        // --line

    /* Nodes */
    nodeBorder: '#71b7ff',           // --accent
    nodeTextColor: '#e7edf3',        // --ink

    /* Edges */
    edgeLabelBackground: '#121820',  // --bg-soft

    /* Fonts */
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    nodeFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    nodeFontSize: '14px',
    labelFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    labelFontSize: '13px',

    /* Specific diagram types */
    flowchart: {
      curve: 'basis',
      htmlLabels: true,
      useMaxWidth: true,
    },
    sequence: {
      actorMargin: 50,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: false,
      bottomMarginAdj: 1,
      useMaxWidth: true,
    },
    gantt: {
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '14px',
      gridLineStartStroke: '#1e2731',
      lineHeight: 1.6,
    },
  },
};

/** CSS-in-JS string for mermaid.initialize() */
export const mermaidInitConfig = `
  theme: 'base',
  themeVariables: {
    background: '#0c1014',
    primaryColor: '#121820',
    primaryBorderColor: '#71b7ff',
    primaryTextColor: '#e7edf3',
    secondaryColor: '#18202a',
    secondaryBorderColor: '#2a3542',
    secondaryTextColor: '#e7edf3',
    tertiaryColor: '#1e2731',
    tertiaryBorderColor: '#71b7ff',
    tertiaryTextColor: '#e7edf3',
    lineColor: '#2a3542',
    textColor: '#e7edf3',
    mainBkg: '#0c1014',
    secondBkg: '#121820',
    tertiaryBkg: '#18202a',
    clusterBkg: '#121820',
    clusterBorder: '#1e2731',
    nodeBorder: '#71b7ff',
    nodeTextColor: '#e7edf3',
    edgeLabelBackground: '#121820',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    nodeFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    nodeFontSize: '14px',
    labelFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    labelFontSize: '13px',
  },
  flowchart: { curve: 'basis', htmlLabels: true, useMaxWidth: true },
  sequence: { actorMargin: 50, boxMargin: 10, boxTextMargin: 5, noteMargin: 10, messageMargin: 35, mirrorActors: false, bottomMarginAdj: 1, useMaxWidth: true },
  gantt: { fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '14px', gridLineStartStroke: '#1e2731', lineHeight: 1.6 },
`;