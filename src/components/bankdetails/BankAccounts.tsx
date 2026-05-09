import { bankAccounts } from "./BankData";

const BankAccounts = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
=======
      <h2 className="text-2xl font-bold text-center mb-6 text-sky-700">
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
        Naira Accounts
      </h2>

      <div className="space-y-4">
        {bankAccounts.map((acct, index) => (
          <div key={index} className="border rounded-md p-4">
            <p className="font-semibold">{acct.bank}</p>
            <p>Acct. No: {acct.accountNo}</p>
            <p>Acct. Name: {acct.accountName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
