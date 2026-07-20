import React, { useState } from "react";
import axios from "axios";
import "./register.css"; // Import the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    password: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    aboutMe: "",
    role: "caretaker",
    dob: "20|11|2003",
    gender: "",
  });
  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (avatar) {
      data.append("avatar", avatar); // field name must match multer
    }

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Registration Successful!");
    console.log(response.data);

    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      password: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
      aboutMe: "",
      role: "caretaker",
      dob: "",
      gender: "",
    });

    setAvatar(null);
  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    // <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center py-10">
    //   <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
    //     <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
    //       ElderCare
    //     </h1>

    //     <p className="text-center text-gray-500 mb-8">
    //       Create your account
    //     </p>

    //     <form
    //       onSubmit={handleSubmit}
    //       className="grid grid-cols-1 md:grid-cols-2 gap-5"
    //     >
    //       {/* First Name */}
    //       <div>
    //         <label className="font-medium">First Name</label>
    //         <input
    //           type="text"
    //           name="firstName"
    //           value={formData.firstName}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Last Name */}
    //       <div>
    //         <label className="font-medium">Last Name</label>
    //         <input
    //           type="text"
    //           name="lastName"
    //           value={formData.lastName}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Email */}
    //       <div>
    //         <label className="font-medium">Email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Password */}
    //       <div>
    //         <label className="font-medium">Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Phone Number */}
    //       <div>
    //         <label className="font-medium">Phone Number</label>
    //         <input
    //           type="tel"
    //           name="phoneNumber"
    //           value={formData.phoneNumber}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* WhatsApp */}
    //       <div>
    //         <label className="font-medium">WhatsApp Number</label>
    //         <input
    //           type="tel"
    //           name="whatsappNumber"
    //           value={formData.whatsappNumber}
    //           onChange={handleChange}
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* DOB */}
    //       <div>
    //         <label className="font-medium">Date of Birth</label>
    //         <input
    //           type="date"
    //           name="dob"
    //           value={formData.dob}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Gender */}
    //       <div>
    //         <label className="font-medium">Gender</label>
    //         <select
    //           name="gender"
    //           value={formData.gender}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         >
    //           <option value="">Select Gender</option>
    //           <option value="Male">Male</option>
    //           <option value="Female">Female</option>
    //           <option value="Other">Other</option>
    //         </select>
    //       </div>

    //       {/* Role */}
    //       <div>
    //         <label className="font-medium">Role</label>
    //         <select
    //           name="role"
    //           value={formData.role}
    //           onChange={handleChange}
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         >
    //           <option value="caregiver">Caregiver</option>
    //           <option value="elder">Elder</option>
    //           <option value="admin">Admin</option>
    //         </select>
    //       </div>

    //       {/* Address */}
    //       <div className="md:col-span-2">
    //         <label className="font-medium">Address</label>
    //         <textarea
    //           rows="3"
    //           name="address"
    //           value={formData.address}
    //           onChange={handleChange}
    //           required
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* About Me */}
    //       <div className="md:col-span-2">
    //         <label className="font-medium">About Me</label>
    //         <textarea
    //           rows="4"
    //           name="aboutMe"
    //           value={formData.aboutMe}
    //           onChange={handleChange}
    //           placeholder="Tell us about yourself..."
    //           className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    //         />
    //       </div>

    //       {/* Submit */}
    //       <div className="md:col-span-2">
    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
    //         >
    //           {loading ? "Registering..." : "Register"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>


    <div className="register-container">
  <div className="register-card">

    <h1 className="register-title">ElderCare</h1>
    <p className="register-subtitle">Create your account</p>

    <form className="register-form" onSubmit={handleSubmit}>

  <div className="form-group">
    <label>First Name</label>
    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Last Name</label>
    <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group full-width">
  <label>Profile Picture</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setAvatar(e.target.files[0])}
  />
</div>

  <div className="form-group">
    <label>Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Phone Number</label>
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>WhatsApp Number</label>
    <input
      type="text"
      name="whatsappNumber"
      value={formData.whatsappNumber}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Date of Birth</label>
    <input
      type="date"
      name="dob"
      required
    />
  </div>

  <div className="form-group">
    <label>Gender</label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      required
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div className="form-group">
    <label>Role</label>
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
    >
      <option value="caretaker">Caretaker</option>
      <option value="elder">Elder</option>
      <option value="guardian">Guardian</option>
    </select>
  </div>

  <div className="form-group full-width">
    <label>Address</label>
    <textarea
      rows="3"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group full-width">
    <label>About Me</label>
    <textarea
      rows="4"
      name="aboutMe"
      value={formData.aboutMe}
      onChange={handleChange}
    />
  </div>

  <button
    type="submit"
    className="submit-btn"
    disabled={loading}
  >
    {loading ? "Registering..." : "Register"}
  </button>

</form>

  </div>
</div>
  );
};

export default Register;