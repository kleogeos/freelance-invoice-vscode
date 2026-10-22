const { render } = require("./render.js");

// Parity checks against the same logic as kleogeos/freelance-invoice-js
// (this extension bundles its own copy of render.js so it has zero npm deps).

const example1 = {
  invoice_number: "INV-0001",
  from: "Jane Doe, Freelance Developer",
  to: "Acme Corp",
  date: "2026-10-14",
  due_date: "2026-10-28",
  tax_rate: 0,
  items: [
    { description: "Website redesign — homepage + 3 subpages", qty: 1, rate: 1800 },
    { description: "Extra revision round", qty: 2, rate: 90 },
  ],
  notes: "Net 14. Late payments accrue 1.5% monthly interest after the due date.",
};

let failures = 0;
function check(name, cond) {
  if (!cond) {
    failures++;
    console.error(`FAIL: ${name}`);
  }
}

const out1 = render(example1);
check("invoice number present", out1.includes("INV-0001"));
check("client name present", out1.includes("Acme Corp"));
check("subtotal math (1800 + 180)", out1.includes("Subtotal: $1,980.00"));
check("tax row omitted when zero", !out1.includes("Tax ("));
check("total correct", out1.includes("Total: $1,980.00"));

const taxed = render({
  invoice_number: "INV-0002",
  from: "A",
  to: "B",
  tax_rate: 10,
  items: [{ description: "x", qty: 1, rate: 100 }],
});
check("tax applied when present", taxed.includes("Tax (10%): $10.00"));
check("total with tax", taxed.includes("Total: $110.00"));

const xss = render({
  invoice_number: "INV-0005",
  from: "A",
  to: "B",
  items: [{ description: "<script>alert(1)</script>", qty: 1, rate: 10 }],
});
check("description is HTML-escaped", !xss.includes("<script>") && xss.includes("&lt;script&gt;"));

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed`);
  process.exit(1);
}
console.log("All invoice-rendering parity checks passed.");
