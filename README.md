
# Invoice Management Application

This application allows users to create, view, and manage invoices. Users can also upload their profile pictures and print invoice details. The application is built using React and integrates with Firebase for data storage and retrieval.

## Features

### 1. Create New Invoice
- Users can create new invoices by filling out a form with the following fields:
  - Employee Name
  - Invoice Date
  - Due Date
  - Amount
  - Invoice Type (Salary or Other)
- After submitting the form, the invoice data is stored in Firebase Firestore.

### 2. View Invoices
- The application fetches and displays a list of invoices from Firebase Firestore.
- Each invoice displays the following details:
  - Invoice ID
  - Invoice Type
  - Amount
- Users can click on an invoice row to view detailed information about the invoice.

### 3. Delete Invoice
- Users can delete an invoice by clicking the delete icon next to the invoice in the list.
- A confirmation dialog is shown before the invoice is deleted.

### 4. Invoice Details
- Detailed information about an invoice is displayed, including:
  - Invoice ID
  - Invoice Type
  - Amount
  - Due Date
  - Invoice Date
- Users can print the invoice details by clicking the print icon.

### 5. Upload Profile Picture
- Users can upload their profile picture, which is then displayed in the invoice details section.
- The profile picture upload button is hidden once an image is selected and shown only if no image is selected.

## Installation and Setup

### Prerequisites
- Node.js
- Firebase account

### Installation Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/invoice-management-app.git
    cd invoice-management-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up Firebase:
    - Create a Firebase project and add a web app to the project.
    - Copy the Firebase configuration and create a `Firebase.js` file in the `src` directory.
    - Initialize Firebase in the `Firebase.js` file:
        ```javascript
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        export { db };
        ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Creating a New Invoice
- Navigate to the "New Invoice" page.
- Fill out the form with the required information and click "Add Invoice".

### Viewing Invoices
- Navigate to the "Invoices" page to see a list of all invoices.
- Click on an invoice row to view detailed information.

### Deleting an Invoice
- Click the delete icon next to the invoice you want to delete.
- Confirm the deletion in the dialog box.

### Uploading a Profile Picture
- On the "New Invoice" page, click the "Upload your profile" button.
- Select an image file from your device.
- The selected image will be displayed in the profile section.

### Printing Invoice Details
- In the invoice details view, click the print icon to print the invoice details.

## License
This project is licensed under the MIT License.
