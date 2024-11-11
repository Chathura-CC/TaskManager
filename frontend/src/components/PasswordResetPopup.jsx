import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/slices/userSlice";

const PasswordResetPopup = ({ closePopup }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleResetPassword = () => {
    if (!oldPassword || !newPassword) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    dispatch(resetPassword({ oldPassword, newPassword }))
      .then(() => {
        setLoading(false);
        closePopup();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Failed to reset password.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg w-96 max-w-full">
        <h2 className="mb-4 text-xl font-bold">Reset Password</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          placeholder="Old Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleResetPassword}
          className="w-full p-2 text-white bg-blue-500 rounded"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <button
          onClick={closePopup}
          className="w-full p-2 mt-4 text-white bg-red-500 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPopup;
