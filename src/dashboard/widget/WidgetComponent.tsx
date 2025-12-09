import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { FaUserFriends } from 'react-icons/fa';
import { MdAttachMoney } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";
import { fetchTotalMembers, fetchTotalExpenditure, fetchNationalMonthlyReport, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { toast } from 'react-toastify';

const WidgetComponent: React.FC = () => {
  const [totalMembers, setTotalMembers] = useState<number | null>(null);
  const [totalMonthlyReport, setTotalMonthlyReport] = useState<number | null>(null);
  const [totalExpenditure, setTotalExpenditure] = useState<number | null>(null);
  const [totalSoulsSaved, setTotalSoulsSaved] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersCount = await fetchTotalMembers();
        console.log('Total Members:', membersCount);
        setTotalMembers(membersCount);

        const monthlyReportData: MonthlyReportDTO[] = await fetchNationalMonthlyReport();
        console.log('Fetched monthly report data:', monthlyReportData);

        const totalReports = monthlyReportData.length;
        const totalSpent = await fetchTotalExpenditure();
        const totalSoulsSavedCount = monthlyReportData.reduce((acc, report) => acc + parseFloat(report.souls_won || '0'), 0);

        console.log('Total Reports:', totalReports);
        console.log('Total Expenditure Captured:', totalSpent);
        console.log('Total Souls Saved:', totalSoulsSavedCount);

        setTotalMonthlyReport(totalReports);
        setTotalExpenditure(totalSpent);
        setTotalSoulsSaved(totalSoulsSavedCount);
      } catch (error) {
        toast.error('Failed to fetch widget data');
        console.error('Error fetching widget data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Widget
        title="Total Members Registered"
        icon={<FaUserFriends />}
        content={<div className="text-lg font-semibold">{totalMembers !== null ? totalMembers : 'Loading...'}</div>}
        link="/dashboard/userprofile"
      />
      <Widget
        title="Total Monthly Report"
        icon={<TbFileReport />}
        content={<div className="text-lg font-semibold">{totalMonthlyReport !== null ? totalMonthlyReport : 'Loading...'}</div>}
        link="/dashboard/monthlyReportTable"
      />
      <Widget
        title="Total Expenditure Captured"
        icon={<MdAttachMoney />}
        content={<div className="text-lg font-semibold">{totalExpenditure !== null ? totalExpenditure.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) : 'Loading...'}</div>}
        link="/dashboard/monthlyReportTable"
      />
      <Widget
        title="Total Souls Saved"
        icon={<FaUserFriends />}
        content={<div className="text-lg font-semibold">{totalSoulsSaved !== null ? totalSoulsSaved : 'Loading...'}</div>}
        link="/dashboard/monthlyReportTable"
      />
    </div>
  );
};

export default WidgetComponent;
