// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PaymentIcon from "@mui/icons-material/Payment";
// import SecurityIcon from "@mui/icons-material/Security";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

export const appMenu = [
  // {
  //     module: "Dashboard",
    //   icons: <DashboardIcon sx={{ fontSize: "22px", mr: "8px" }} />,
  //     route: "Dashboard/Default",
  //     menues: [],
  // },
  {
    module: "Administration",
    // icons: <SecurityIcon sx={{ fontSize: "22px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        ControlID: "41",
        name: "Company Setup",
        route: "Setup/CompanySetup",
      },
      {
        name: "Users",
        route: "Security/Users",
        ControlID: "7",

      },
      {
        name: "Roles",
        route: "Security/Roles",
        ControlID: "8",
      },
      {
        ControlID: "168",
        name: "Approval Workflow",
        route: "Setup/ApprovalWorkflow",
      },
      {
        ControlID: "42",
        name: "Period",
        route: "Setup/Period",
      },
      {
        ControlID: "43",
        name: "Tax Detail",
        route: "Setup/TaxDetail",
      },
      {
        ControlID: "44",
        name: "Tax Schedule",
        route: "Setup/TaxSchedule",
      },
      {
        ControlID: "53",
        name: "Currencies",
        route: "Setup/Currencies",
      },
      {
        ControlID: "46",
        name: "Aging Buckets",
        route: "Setup/AgingBuckets",
      },
      {
        ControlID: "47",
        name: "Payment Terms",
        route: "Setup/PaymentTerms",
      },
      {
        ControlID: "48",
        name: "Payment Modes",
        route: "Setup/PaymentModes",
      },
      {
        ControlID: "51",
        name: "Categories",
        route: "Setup/Categories",
      },
      {
        ControlID: "52",
        name: "Sources",
        route: "Setup/Sources",
      },
    ],
  },
  {
    module: "Financials",
    // icons: <PaymentIcon sx={{ fontSize: "23px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        name: "Setup",
        route: "",
        children: [
          {
            ControlID: "33",
            name: "Financials Setup",
            route: "Setup/FinancialsSetup",
          },
          {
            ControlID: "42",
            name: "Petty Cash Codes",
            route: "Setup/PettyCashCodes",
          },
          {
            ControlID: "45",
            name: "Bank",
            route: "Setup/Bank",
          },
          {
            ControlID: "49",
            name: "Segment Values",
            route: "Setup/SegmentValues",
          },
          {
            ControlID: "51",
            name: "Cards",
            route: "Setup/Cards",
          },
          {
            ControlID: "52",
            name: "Jobs",
            route: "Setup/Jobs",
          },
          {
            ControlID: "123",
            name: "Extended Jobs",
            route: "Setup/ExtendedJobs",
          },
          {
            ControlID: "56",
            name: "Budgets",
            route: "Setup/Budgets",
          },
          {
            ControlID: "61",
            name: "LC Categories",
            route: "Setup/LCCategories",
          },
          {
            ControlID: "62",
            name: "LC Codes",
            route: "Setup/LCCodes",
          },
        ],
      },
      {
        name: "Transactions",
        route: "",
        children: [
          {
            ControlID: "68",
            name: "Journal Entry",
            route: "Transactions/JournalEntry",
          },
          {
            ControlID: "69",
            name: "Journal Payment",
            route: "Transactions/JournalPayment",
          },
          {
            ControlID: "70",
            name: "Journal Receipt",
            route: "Transactions/JournalReceipt",
          },
          {
            ControlID: "71",
            name: "Bank Transfers",
            route: "Transactions/BankTransfers",
          },
          {
            ControlID: "142",
            name: "Petty Cash",
            route: "Transactions/PettyCash",
          },
          {
            ControlID: "158",
            name: "Bank Reconciliation",
            route: "Transactions/BankReconciliation",
          },
        ],
      },
      {
        name: "Reports",
        route: "",
        children: [
          {
            ControlID: "89",
            name: "Segment Report",
            route: "Reports/SegmentReport",
          },
          {
            ControlID: "90",
            name: "General Ledger Report",
            route: "Reports/GeneralLedgerReport",
          },
          {
            ControlID: "91",
            name: "General Journal Report",
            route: "Reports/GeneralJournalReport",
          },
          {
            ControlID: "92",
            name: "Accounts Activity Report",
            route: "Reports/AccountsActivityReport",
          },
          {
            ControlID: "93",
            name: "Trial Balance Report",
            route: "Reports/TrialBalanceReport",
          },
          {
            ControlID: "94",
            name: "Job Activity Report",
            route: "Reports/JobActivityReport",
          },
          {
            ControlID: "95",
            name: "Job Ledger Report",
            route: "Reports/JobLedgerReport",
          },
          {
            ControlID: "96",
            name: "Budget  Activity Report",
            route: "Reports/BudgetActivityReport",
          },
          {
            ControlID: "97",
            name: "Bank Reconciliation Report",
            route: "Reports/BankReconciliationReport",
          },
          {
            ControlID: "99",
            name: "Income Statement Report",
            route: "Reports/IncomeStatementReport",
          },
          {
            ControlID: "100",
            name: "Voucher Printing Report",
            route: "Reports/VoucherPrintingReport",
          },
          {
            ControlID: "101",
            name: "Balance Sheet Report",
            route: "Reports/BalanceSheetReport",
          },
          {
            ControlID: "134",
            name: "Cheque Printing",
            route: "Reports/ChequePrinting",
          },
          {
            ControlID: "160",
            name: "PDC Ledger",
            route: "Reports/PDCLedger",
          },
          {
            ControlID: "161",
            name: "LC Ledger",
            route: "Reports/LCLedger",
          },
          {
            ControlID: "162",
            name: "Batchwise Cost Sheet",
            route: "Reports/BatchwiseCostSheet",
          },
        ],
      },
    ],
  },
  {
    module: "Purchases",
    // icons: <InventoryIcon sx={{ fontSize: "23px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        name: "Setup",
        route: "",
        children: [
          {
            ControlID: "61",
            name: "Purchases Setup",
            route: "Setup/PurchasesSetup",
          },

          {
            ControlID: "58",
            name: "Vendor Categories",
            route: "Setup/VendorCategories",
          },
          {
            ControlID: "59",
            name: "Vendor Profiles",
            route: "Setup/VendorProfiles",
          },
          {
            ControlID: "60",
            name: "Vendors",
            route: "Setup/Vendors",
          },
          {
            ControlID: "174",
            name: "PR Category",
            route: "Setup/PRCategory",
          },
          {
            ControlID: "175",
            name: "PO Category",
            route: "Setup/POCategory",
          },
          {
            ControlID: "176",
            name: "Cost Center",
            route: "Setup/CostCenter",
          },
        ],
      },
      {
        name: "Transactions",
        route: "",
        children: [
          {
            ControlID: "82",
            name: "Purchase Requisition",
            route: "Transactions/PurchaseRequisition",
          },
          {
            ControlID: "83",
            name: "Purchase Order",
            route: "Transactions/PurchaseOrder",
          },
          {
            ControlID: "84",
            name: "Goods Receipt Note",
            route: "Transactions/GoodsReceiptNote",
          },
          {
            ControlID: "94",
            name: "Payable Invoice",
            route: "Transactions/PayableInvoice",
          },
          {
            ControlID: "85",
            name: "Purchase Invoice",
            route: "Transactions/PurchaseInvoice",
          },
          {
            ControlID: "86",
            name: "Purchase Return",
            route: "Transactions/PurchaseReturn",
          },
          {
            ControlID: "97",
            name: "Payments",
            route: "Transactions/Payments",
          },
          {
            ControlID: "163",
            name: "Bulk Payments",
            route: "Transactions/BulkPayments",
          },
          {
            ControlID: "74",
            name: "Apply Documents",
            route: "Transactions/ApplyDocuments",
          },
        ],
      },
      {
        name: "Reports",
        route: "",
        children: [
          {
            ControlID: "111",
            name: "Vendor Ledger",
            route: "Reports/VendorLedger",
          },
          {
            ControlID: "112",
            name: "Aging Payable",
            route: "Reports/AgingPayable",
          },
          {
            ControlID: "113",
            name: "Advance Paid",
            route: "Reports/AdvancePaid",
          },
          {
            ControlID: "114",
            name: "WH Tax Payable",
            route: "Reports/WHTaxPayable",
          },
          {
            ControlID: "115",
            name: "Purchase Register",
            route: "Reports/PurchaseRegister",
          },
          {
            ControlID: "156",
            name: "Landed Cost Report",
            route: "Reports/LandedCostReport",
          },
        ],
      },
      {
        name: "Inquiries",
        route: "",
        menues: [],
      },
      {
        name: "Utilities",
        route: "",
        menues: [],
      },
    ],
  },
  {
    module: "Sales",
    // icons: <PointOfSaleIcon sx={{ fontSize: "23px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        name: "Setup",
        route: "",
        children: [
          {
            ControlID: "147",
            name: "Sales Setup",
            route: "Setup/SalesSetup",
          },
          {
            ControlID: "63",
            name: "Territories",
            route: "Setup/Territories",
          },
          {
            ControlID: "67",
            name: "Shipping Methods",
            route: "Setup/ShippingMethods",
          },
          {
            ControlID: "64",
            name: "Customer Profiles",
            route: "Setup/CustomerProfiles",
          },
          {
            ControlID: "65",
            name: "Customer Categories",
            route: "Setup/CustomerCategories",
          },
          {
            ControlID: "66",
            name: "Customers",
            route: "Setup/Customers",
          },
        ],
      },
      {
        name: "Transactions",
        route: "",
        children: [
          {
            ControlID: "78",
            name: "Sales Quotation",
            route: "Transactions/SalesQuotation",
          },
          {
            ControlID: "79",
            name: "Sales Order",
            route: "Transactions/SalesOrder",
          },
          {
            ControlID: "80",
            name: "Delivery Order",
            route: "Transactions/DeliveryOrder",
          },
          {
            ControlID: "144",
            name: "Gate Pass",
            route: "Transactions/GatePass",
          },
          {
            ControlID: "85",
            name: "Receivable Invoice",
            route: "Transactions/ReceivableInvoice",
          },
          {
            ControlID: "81",
            name: "Sales Invoice",
            route: "Transactions/SalesInvoice",
          },
          {
            ControlID: "87",
            name: "Sales Return",
            route: "Transactions/SalesReturn",
          },
          {
            ControlID: "76",
            name: "Receipts",
            route: "Transactions/Receipts",
          },
          {
            ControlID: "159",
            name: "Bulk Receipts",
            route: "Transactions/BulkReceipts",
          },
          {
            ControlID: "77",
            name: "Apply Documents",
            route: "Transactions/ApplyDocuments",
          },
        ],
      },
      {
        name: "Reports",
        route: "",
        children: [
          {
            ControlID: "109",
            name: "Sales Register",
            route: "Reports/SalesRegister",
          },
          {
            ControlID: "116",
            name: "Customer List",
            route: "Reports/CustomerList",
          },
          {
            ControlID: "117",
            name: "Customer Ledger",
            route: "Reports/CustomerLedger",
          },
          {
            ControlID: "118",
            name: "Aging Receivable",
            route: "Reports/AgingReceivable",
          },
          {
            ControlID: "119",
            name: "Advance Paid",
            route: "Reports/AdvancePaid",
          },
          {
            ControlID: "120",
            name: "Customer Recovery",
            route: "Reports/CustomerRecovery",
          },
          {
            ControlID: "121",
            name: "Sales Batchwise",
            route: "Reports/SalesBatchwise",
          },
          {
            ControlID: "145",
            name: "Sales Register",
            route: "Reports/SalesRegister",
          },
        ],
      },
      {
        name: "Inquiries",
        route: "",
        menues: [],
      },
      {
        name: "Utilities",
        route: "",
        menues: [],
      },
    ],
  },
  {
    module: "Inventory",
    // icons: <SupervisorAccountIcon sx={{ fontSize: "23px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        name: "Setup",
        route: "",
        children: [
          {
            ControlID: "148",
            name: "Inventory Setup",
            route: "Setup/InventorySetup",
          },
          {
            ControlID: "21",
            name: "Locations",
            route: "Setup/Locations",
          },
          {
            ControlID: "22",
            name: "Unit of Measures",
            route: "Setup/UnitofMeasures",
          },
          {
            ControlID: "23",
            name: "Attributes",
            route: "Setup/Attributes",
          },
          {
            ControlID: "24",
            name: "Item Class",
            route: "Setup/ItemClass",
          },
          {
            ControlID: "25",
            name: "Items",
            route: "Setup/Items",
          },
        ],
      },
      {
        name: "Transactions",
        route: "",
        children: [
          {
            ControlID: "26",
            name: "Requisition",
            route: "Transactions/Requisition",
          },
          {
            ControlID: "27",
            name: "Transfers",
            route: "Transactions/Transfers",
          },
          {
            ControlID: "28",
            name: "Receivings",
            route: "Transactions/Receivings",
          },
          {
            ControlID: "29",
            name: "Adjustments",
            route: "Transactions/Adjustments",
          },
        ],
      },
      {
        name: "Reports",
        route: "",
        children: [
          {
            ControlID: "135",
            name: "Stock Position",
            route: "Reports/StockPosition",
          },
          {
            ControlID: "157",
            name: "Dispatch to GatePass",
            route: "Reports/DispatchtoGatePass",
          },
        ],
      },
      {
        name: "Inquiries",
        route: "",
        menues: [],
      },
      {
        name: "Utilities",
        route: "",
        menues: [],
      },
    ],
  },
  {
    module: "Not For Profit",
    // icons: <SupervisorAccountIcon sx={{ fontSize: "23px", mr: "8px" }} />,
    route: "",
    menues: [
      {
        name: "Setup",
        route: "",
        children: [
          {
            ControlID: "128",
            name: "Donor Registration",
            route: "Setup/DonorRegistration",
          },
          {
            ControlID: "129",
            name: "Campaigns",
            route: "Setup/Campaigns",
          },
          {
            ControlID: "131",
            name: "Care Of",
            route: "Setup/CareOf",
          },
        ],
      },
      {
        name: "Transactions",
        route: "",
        children: [
          {
            ControlID: "130",
            name: "Donor Receipts",
            route: "Transactions/DonorReceipts",
          },
          {
            ControlID: "164",
            name: "Donations",
            route: "Transactions/Donations",
          },
        ],
      },
      {
        name: "Reports",
        route: "",
        children: [
         {
            ControlID: "132",
            name: "Donor Summary",
            route: "Reports/DonorSummary",
          },
          {
            ControlID: "133",
            name: "Donor Detail",
            route: "Reports/DonorDetail",
          },
        ],
      },
      {
        name: "Inquiries",
        route: "",
        menues: [],
      },
      {
        name: "Utilities",
        route: "",
        menues: [],
      },
    ],
  },
];

export const jsonData = () => {
  const transformedData : any= {};

  appMenu.forEach((menu) => {
    const moduleName = menu.module;
    transformedData[moduleName] = [];

    menu.menues.forEach((submenu:any) => {
      if (submenu.children) {
        submenu.children.forEach((child:any) => {
          if (submenu.name === "Setup") {
            transformedData[moduleName].push({
              ControlID: child.ControlID,
              ControlName: child.name,
              ControlType: submenu.name,
              Create: false,
              View: false,
              Edit: false,
              Delete: false,
            });
          } else if (submenu.name === "Transactions") {
            transformedData[moduleName].push({
              ControlID: child.ControlID,
              ControlName: child.name,
              ControlType: submenu.name,
              Create: false,
              View: false,
              Edit: false,
              Delete: false,
              Post: false,
            });
          } else if (
            submenu.name === "Reports" ||
            submenu.name === "Utilities" ||
            submenu.name === "Inquiries"
          ) {
            transformedData[moduleName].push({
              ControlID: child.ControlID,
              ControlName: child.name,
              ControlType: submenu.name,
              View: false,
            });
          }
        });
      } else {
        transformedData[moduleName].push({
          ControlID: submenu.ControlID,
          ControlName: submenu.name,
          ControlType: "Setup",
          Create: false,
          View: false,
          Edit: false,
          Delete: false,
        });
      }
    });
  });

  return transformedData;
};


