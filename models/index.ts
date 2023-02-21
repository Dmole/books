import { ModelMap } from 'fyo/model/types';
import { Account } from './baseModels/Account/Account';
import { AccountingLedgerEntry } from './baseModels/AccountingLedgerEntry/AccountingLedgerEntry';
import { AccountingSettings } from './baseModels/AccountingSettings/AccountingSettings';
import { Address } from './baseModels/Address/Address';
import { Defaults } from './baseModels/Defaults/Defaults';
import { Item } from './baseModels/Item/Item';
import { JournalEntry } from './baseModels/JournalEntry/JournalEntry';
import { JournalEntryAccount } from './baseModels/JournalEntryAccount/JournalEntryAccount';
import { Party } from './baseModels/Party/Party';
import { Payment } from './baseModels/Payment/Payment';
import { PaymentFor } from './baseModels/PaymentFor/PaymentFor';
import { PurchaseInvoice } from './baseModels/PurchaseInvoice/PurchaseInvoice';
import { PurchaseInvoiceItem } from './baseModels/PurchaseInvoiceItem/PurchaseInvoiceItem';
import { SalesInvoice } from './baseModels/SalesInvoice/SalesInvoice';
import { SalesInvoiceItem } from './baseModels/SalesInvoiceItem/SalesInvoiceItem';
import { SetupWizard } from './baseModels/SetupWizard/SetupWizard';
import { Tax } from './baseModels/Tax/Tax';
import { TaxSummary } from './baseModels/TaxSummary/TaxSummary';
import { InventorySettings } from './inventory/InventorySettings';
import { Location } from './inventory/Location';
import { PurchaseReceipt } from './inventory/PurchaseReceipt';
import { PurchaseReceiptItem } from './inventory/PurchaseReceiptItem';
import { Shipment } from './inventory/Shipment';
import { ShipmentItem } from './inventory/ShipmentItem';
import { StockLedgerEntry } from './inventory/StockLedgerEntry';
import { StockMovement } from './inventory/StockMovement';
import { StockMovementItem } from './inventory/StockMovementItem';
import { UOMConversion } from './inventory/UOMConversion';

export const models = {
  Account,
  AccountingLedgerEntry,
  AccountingSettings,
  Address,
  Defaults,
  Item,
  JournalEntry,
  JournalEntryAccount,
  Party,
  Payment,
  PaymentFor,
  PurchaseInvoice,
  PurchaseInvoiceItem,
  SalesInvoice,
  SalesInvoiceItem,
  SetupWizard,
  Tax,
  TaxSummary,
  // Inventory Models
  InventorySettings,
  UOMConversion,
  StockMovement,
  StockMovementItem,
  StockLedgerEntry,
  Location,
  Shipment,
  ShipmentItem,
  PurchaseReceipt,
  PurchaseReceiptItem,
} as ModelMap;

export async function getRegionalModels(
  countryCode: string
): Promise<ModelMap> {
  if (countryCode !== 'in') {
    return {};
  }

  const { Address } = await import('./regionalModels/in/Address');
  const { Party } = await import('./regionalModels/in/Party');
  return { Address, Party };
}
