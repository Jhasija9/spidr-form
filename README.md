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
- PIN input includes a show/hide toggle for better UX
- **Security Detail**: Spidr PIN is Base64-encoded before being logged to the console
- Submits form data to the browser console

---

## Screenshots

### Valid Form State
<img width="1512" height="904" alt="Screenshot 2025-07-11 at 11 24 42 PM" src="https://github.com/user-attachments/assets/ca82b9e7-ead4-4d8d-af02-c6abf227d090" />


---

### Console Output on Submit
<img width="921" height="159" alt="Screenshot 2025-07-11 at 11 25 13 PM" src="https://github.com/user-attachments/assets/38022a88-d2ca-4fb3-bcca-5b71f198613d" />


---

### Error State with Validation
<img width="1511" height="907" alt="Screenshot 2025-07-11 at 11 26 03 PM" src="https://github.com/user-attachments/assets/ec263e8e-5940-4c5d-95ff-5f5030c7a444" />


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
