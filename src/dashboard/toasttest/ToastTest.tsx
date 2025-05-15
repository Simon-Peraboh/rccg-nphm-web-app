import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastTest = () => {
  const showToast = () => {
    toast.success("🚀 Toast is working!");
  };

  useEffect(() => {
    toast.info("ℹ️ Toast test on load!");
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React Toastify Test</h2>
      <button onClick={showToast}>Click to Show Toast</button>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ToastTest;