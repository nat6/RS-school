declare module '*.jpg';
declare module '*.gif';
declare module '*.png';

declare module '*.html' {
  const value: string;
  export default value;
}

declare module '*.scss' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}
