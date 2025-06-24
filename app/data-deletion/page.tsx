// app/data-deletion/page.tsx
export default function page() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-4">Data Deletion Instructions</h1>
      <p className="mb-4">
        If you would like to delete your data associated with our application,
        please follow these instructions:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Send an email to <strong>support@yourdomain.com</strong>
        </li>
        <li>
          Use the subject line: <strong>Delete My Data</strong>
        </li>
        <li>Include the email or Facebook ID you used to log in</li>
      </ul>
      <p className="mb-4">
        Once we receive your request, we will delete your data from our records
        within 48 hours.
      </p>
    </div>
  );
}
