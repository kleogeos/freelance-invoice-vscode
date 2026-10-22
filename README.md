# Freelance Invoice Preview

Preview a clean, printable HTML invoice from a JSON file — right inside VS Code. No account, no cloud upload, no telemetry: everything runs locally.

## Usage

1. Open a JSON file shaped like `example.json` (an `items` array of `{description, qty, rate}`, plus `from`/`to`/`date`/`invoice_number`/optional `tax_rate`/`notes`).
2. Run **Freelance Invoice: Preview from JSON** from the Command Palette (or the preview icon in the editor title bar) to see it rendered beside your JSON.
3. Run **Freelance Invoice: Export as HTML** to write a `.html` file next to it — open it in a browser and print to PDF, or send it straight to a client.

## Example

```json
{
  "invoice_number": "INV-0001",
  "from": "Jane Doe, Freelance Developer",
  "to": "Acme Corp",
  "date": "2026-10-14",
  "due_date": "2026-10-28",
  "tax_rate": 0,
  "items": [
    { "description": "Website redesign", "qty": 1, "rate": 1800 },
    { "description": "Extra revision round", "qty": 2, "rate": 90 }
  ],
  "notes": "Net 14. Late payments accrue 1.5% monthly interest after the due date."
}
```

## Also available as a CLI

Prefer the command line or a CI pipeline? Same renderer, no VS Code required:

- [freelance-invoice-cli](https://github.com/kleogeos/freelance-invoice-cli) (Python)
- [freelance-invoice-js](https://github.com/kleogeos/freelance-invoice-js) (Node, `npx`-able)

## More free tools for freelancers

Rate calculators, contract checklists, crypto-payment helpers and other zero-dependency CLIs: [kleogeos.github.io/freelancer-tools](https://kleogeos.github.io/freelancer-tools/)

## License

MIT
