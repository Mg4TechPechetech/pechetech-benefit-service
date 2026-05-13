export declare class ReceiptFile {
    readonly id: string;
    readonly imageUrl: string;
    readonly hashSha256: string;
    readonly captureDate: Date;
    constructor(id: string, imageUrl: string, hashSha256: string, captureDate: Date);
}
