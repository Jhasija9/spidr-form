# SpidrFry™ 9000 – Interest Form

This is a custom React + TypeScript form built as a fictional interest form for the SpidrFry™ 9000, a new product concept by Spidr Design.

The purpose of this project is to replicate Spidr’s visual branding and UX style by creating a form that could be embedded at the bottom of their landing page. It features thoughtful design, inline validations, and a clean developer experience.

**Live Demo:** [https://spidr-form-vd11.vercel.app/](https://spidr-form-vd11.vercel.app/)

---

## Features

- On-brand UI mimicking Spidr Design’s aesthetics
- Clean layout with centered, accessible form
- Real-time validation and error messages
- Validation rules include:
  - **First/Last Name**: Letters and `.` only
  - **Phone**: U.S. format (123) 456-7890
  - **Email**: Standard email validation
  - **Cost**: Minimum value $0.01
  - **Spidr PIN**: Must be in `####-####-####-####` format
- PIN input with show/hide toggle
- Submits form data to the console

---

## Screenshots

### Valid Form State

![Valid Form](https://files.chat.openai.com/file-9Xs81To1MJ3TgSFz38fdpR)

---

### Console Output on Submit

![Console Output](https://files.chat.openai.com/file-6YXosDkD5aYhN93dYTbrQP)

---

### Error State with Validation

![Validation Errors](https://files.chat.openai.com/file-6KZSqKCtYBHJ9TZATSNyo2)

---

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite
- Hosted on Vercel

---

## Getting Started

To run the project locally:

```bash
git clone https://github.com/your-username/spidr-form.git
cd spidr-form
npm install
npm run dev
