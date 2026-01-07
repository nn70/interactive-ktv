declare module 'jschardet' {
    export interface DetectionResult {
        encoding: string;
        confidence: number;
    }
    export function detect(input: string | Buffer | Uint8Array): DetectionResult;
}
