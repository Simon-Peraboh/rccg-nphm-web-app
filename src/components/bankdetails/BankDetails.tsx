// BankAccounts.tsx
const bankAccounts = [
  {
    bank: "GTBank",
    accountNo: "0224362729",
    accountName: "RCCG Prison and Hospital Ministry",
  },
  {
    bank: "GTBank",
    accountNo: "0678287531",
    accountName: "RCCG PHM Project / Conference",
  },
  {
    bank: "Premium Trust Bank",
    accountNo: "0040149420",
    accountName: "RCCG Prison and Hospital Ministry",
  },
  {
    bank: "Jubilee Life Mortgage Bank",
    accountNo: "0000943479",
    accountName: "RCCG (National) Prison & Hospital Ministry",
  },
];

const BankAccounts = () => {
  return (
    <div className="max-w-3xl mx-auto bg-blue-200 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Naira Accounts
      </h2>

      <div className="space-y-4">
        {bankAccounts.map((acct, index) => (
          <div
            key={index}
            className="border rounded-md p-4 hover:bg-blue-50 transition"
          >
            <p className="font-semibold text-lg">{acct.bank}</p>
            <p>
              <span className="font-medium">Acct. No:</span> {acct.accountNo}
            </p>
            <p>
              <span className="font-medium">Acct. Name:</span> {acct.accountName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
