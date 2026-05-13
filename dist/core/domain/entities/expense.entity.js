"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const payment_status_enum_1 = require("../enums/payment-status.enum");
class Expense {
    constructor(id, userId, fishingCampaignId, supplierName, totalAmount, category, aiConfidenceScore, status, receiptFileId) {
        this.id = id;
        this.userId = userId;
        this.fishingCampaignId = fishingCampaignId;
        this.supplierName = supplierName;
        this.totalAmount = totalAmount;
        this.category = category;
        this.aiConfidenceScore = aiConfidenceScore;
        this.status = status;
        this.receiptFileId = receiptFileId;
    }
    markAsPaidViaMobileMoney() {
        if (this.status !== payment_status_enum_1.PaymentStatus.EN_ATTENTE) {
            throw new Error("Expense is already paid or cannot be paid via mobile money.");
        }
        this.status = payment_status_enum_1.PaymentStatus.PAYE_MOBILE_MONEY;
    }
}
exports.Expense = Expense;
//# sourceMappingURL=expense.entity.js.map