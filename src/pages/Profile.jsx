import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Calendar, LoaderCircle } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const email = "rakr7702@gamail.com"; // Replace with dynamic email if needed

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/auth/getAll?email=${encodeURIComponent(email)}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-6">
      <div className="bg-black/80 backdrop-blur-md  border-5 border-yellow-400 rounded-3xl shadow-2xl w-full max-w-md p-8 text-white">
        {!user ? (
          <div className="flex justify-center">
            <LoaderCircle className="animate-spin text-yellow-400" size={32} />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                <User size={48} className="text-black" />
              </div>
              <h2 className="text-2xl font-bold mt-4 text-yellow-400">{user.name}</h2>
              <p className="text-sm text-gray-300">🎟️ CineMagic Member</p>
            </div>

            <div className="space-y-4">
              <ProfileField icon={<Mail size={20} />} label="Email" value={user.email} />
              <ProfileField icon={<Calendar size={20} />} label="Joined On" value={user.createdAt || "N/A"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 shadow-md">
    <div className="text-yellow-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  </div>
);

export default Profile;
