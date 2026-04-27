export interface OutputFile {
  dir: string;
  path: string;
  content: string;
}
export interface Generator {
  label: string;
  files: OutputFile[];
}
