export class ReceiptFile {
  constructor(
    public readonly id: string,
    public readonly imageUrl: string,
    public readonly hashSha256: string,
    public readonly captureDate: Date,
  ) {}
}
