<<<<<<< HEAD
// BankAccounts.tsx
const bankAccounts = [
=======
import { FaGlobeAfrica, FaLandmark } from "react-icons/fa";

type BankAccount = {
  bank: string;
  accountNo: string;
  accountName: string;
  currency?: string;
};

const localCurrencyAccounts: BankAccount[] = [
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  {
    bank: "GTBank",
    accountNo: "0224362729",
    accountName: "RCCG Prison and Hospital Ministry",
<<<<<<< HEAD
=======
    currency: "NGN",
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  },
  {
    bank: "GTBank",
    accountNo: "0678287531",
    accountName: "RCCG PHM Project / Conference",
<<<<<<< HEAD
=======
    currency: "NGN",
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  },
  {
    bank: "Premium Trust Bank",
    accountNo: "0040149420",
    accountName: "RCCG Prison and Hospital Ministry",
<<<<<<< HEAD
=======
    currency: "NGN",
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  },
  {
    bank: "Jubilee Life Mortgage Bank",
    accountNo: "0000943479",
    accountName: "RCCG (National) Prison & Hospital Ministry",
<<<<<<< HEAD
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
=======
    currency: "NGN",
  },
];

const foreignCurrencyAccounts: BankAccount[] = [
  {
    bank: "GTBank",
    accountNo: "3002389949",
    accountName: "RCCG Prison and Hospital Ministry",
    currency: "USD",
  },
   {
    bank: "GTBank",
    accountNo: "3002390022",
    accountName: "RCCG Prison and Hospital Ministry",
    currency: "POUNDS",
  },
  {
    bank: "GTBank",
    accountNo: "3002390039",
    accountName: "RCCG Prison and Hospital Ministry",
    currency: "EURO",
  },
];

const AccountCard = ({ account }: { account: BankAccount }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg">
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-sky-100 text-sky-700">
        <FaLandmark className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-lg font-black text-slate-950">{account.bank}</p>
          {account.currency && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
              {account.currency}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Account Number
        </p>
        <p className="mt-1 break-words font-mono text-2xl font-black tracking-wide text-sky-700">
          {account.accountNo}
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          <span className="font-bold text-slate-900">Account Name:</span>{" "}
          {account.accountName}
        </p>
      </div>
    </div>
  </article>
);

const BankAccounts = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
              Local Currency
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">
              Naira Accounts
            </h3>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            {localCurrencyAccounts.length} verified accounts
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {localCurrencyAccounts.map((account) => (
            <AccountCard
              key={`${account.bank}-${account.accountNo}`}
              account={account}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Foreign Currencies
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">
              Domiciliary Accounts
            </h3>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            USD, GBP, EUR and other giving channels
          </p>
        </div>

        {foreignCurrencyAccounts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {foreignCurrencyAccounts.map((account) => (
              <AccountCard
                key={`${account.bank}-${account.accountNo}`}
                account={account}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <FaGlobeAfrica className="mx-auto h-9 w-9 text-teal-700" />
            <h4 className="mt-4 text-lg font-black text-slate-950">
              Foreign currency account details are being confirmed.
            </h4>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Please contact the ministry team for current USD, GBP, EUR, or
              other foreign currency giving details before making a transfer.
            </p>
          </div>
        )}
      </section>
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
    </div>
  );
};

export default BankAccounts;
