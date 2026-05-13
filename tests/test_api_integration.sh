#!/bin/bash

# Configuration
BASE_URL="http://localhost:3000"
USER_ID="test_user_$(date +%s)"

echo "--------------------------------------------------"
echo "🧪 Test d'intégration PecheTech Benefit Service"
echo "--------------------------------------------------"

# 1. Créer une dépense
echo "📤 [1/3] Création d'une dépense..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/expenses" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": \"$USER_ID\",
    \"supplierName\": \"Total Marine\",
    \"totalAmount\": 25000,
    \"category\": \"CARBURANT\",
    \"fishingCampaignId\": \"CAMP-2026-TEST\",
    \"aiConfidenceScore\": 0.95,
    \"status\": \"EN_ATTENTE\"
  }")

echo "Response: $CREATE_RESPONSE"
EXPENSE_ID=$(echo $CREATE_RESPONSE | grep -oP '"id":"\K[^"]+')

if [ -z "$EXPENSE_ID" ]; then
  echo "❌ Échec de la création de la dépense."
  exit 1
fi
echo "✅ Dépense créée avec ID: $EXPENSE_ID"

# 2. Payer la dépense
echo "💳 [2/3] Paiement de la dépense..."
PAY_RESPONSE=$(curl -s -X POST "$BASE_URL/expenses/$EXPENSE_ID/pay")
echo "Response: $PAY_RESPONSE"
echo "✅ Paiement effectué."

# 3. Calculer la solvabilité
echo "📊 [3/3] Calcul du score de solvabilité..."
SOLVABILITY_RESPONSE=$(curl -s -X POST "$BASE_URL/expenses/solvability/$USER_ID")
echo "Response: $SOLVABILITY_RESPONSE"
echo "✅ Score calculé."

echo "--------------------------------------------------"
echo "🏁 Test terminé avec succès !"
echo "--------------------------------------------------"
