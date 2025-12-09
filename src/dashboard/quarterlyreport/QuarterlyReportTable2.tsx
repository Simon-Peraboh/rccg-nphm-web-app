import React, { useEffect, useState } from "react";
import axios from "axios";

interface QuarterlyReport {
  id: string;
  whichYear: string;
  period: string;
  totalSouls: string;
  totalAmount: string;
}

const QuarterlyReportTable2: React.FC = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get<QuarterlyReport[]>("http://127.0.0.1:8000/api/quarterlyReport/getAllReport");
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')); // Remove any non-numeric characters
    if (isNaN(numericAmount)) {
      console.error(`Invalid amount: ${amount}`);
      return 'NGN0'; // Return default value if parsing fails
    }
    return `NGN${numericAmount.toLocaleString('en-NG', { minimumFractionDigits: 0 })}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mr-1 ml-1">
      {reports.length === 0 ? (
        <div className="text-center text-gray-500">No data available</div>
      ) : (
        <table className="min-w-full table-auto bg-cyan-50 rounded-md shadow-md border-separate p-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1">SN</th>
              <th className="px-2 py-1">Year</th>
              <th className="px-2 py-1">Period</th>
              <th className="px-2 py-1">Total Souls</th>
              <th className="px-2 py-1">Total Amount</th>
              </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id} className="border-b-2 border-gray-400 hover:bg-white">
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">{report.whichYear}</td>
                <td className="px-2 py-1">{report.period}</td>
                <td className="px-2 py-1">{report.totalSouls}</td>
                <td className="px-2 py-1">{formatCurrency(report.totalAmount)}</td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuarterlyReportTable2;
