import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookingForm = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pinCode: "",
    city: "",
    electricBill: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Validation Function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName?.trim())
      newErrors.fullName = "Full Name is required";
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.phoneNumber?.trim() || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Valid 10-digit Phone Number is required";
    if (!formData.pinCode?.trim() || !/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = "Valid 6-digit Pin Code is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.electricBill)
      newErrors.electricBill = "Please select a Bill range";

    setErrors(newErrors);
    // console.log("Validation Errors:", newErrors);
    // console.log("Validation Errors:", JSON.stringify(errors, null, 2));

    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form contains errors. Submission blocked.");
      Swal.fire(
        "Validation Error",
        "Please fix the errors in the form.",
        "warning"
      );
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/send-email`, formData);
      // axios.post("http://localhost:5800/api/send-email", formData);

      // ✅ Show SweetAlert2 success popup with OK button
      Swal.fire({
        title: "Success!",
        text: "Thank you for submitting the form.We will get back to you soon.",
        icon: "success",
        showConfirmButton: true,
        timer: 2000, // Auto close after 2 seconds
        customClass: {
          popup: "custom-popup",
        },
      });

      // ✅ Reset the form fields
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        pinCode: "",
        city: "",
        electricBill: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error", "Failed to submit form. Please try again!", "error");
    }
  };

  return (
    <div
      id="consultant"
      className="relative flex items-center justify-center bg-red-800"
    >


      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}assets/solar_images/form.avif`}
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-red-900 opacity-90"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-lg px-6 sm:px-8 py-8 sm:py-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
          Book FREE <br /> consultation!
        </h1>
        <p className="mt-2 text-center text-gray-200 text-xl sm:text-base">
          Connect with our solar experts for honest, professional
        </p>
        <p className="text-center text-gray-200 text-xl sm:text-base">
          advice tailored to your needs
        </p>

        <form className="mt-6 sm:mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && (
                <p className="text-red-100 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-100 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-100 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Pin Code"
                name="pinCode"
                className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
              {errors.pinCode && (
                <p className="text-red-100 text-sm">{errors.pinCode}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="City"
                name="city"
                className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <p className="text-red-100 text-sm">{errors.city}</p>
              )}
            </div>
          </div>

          <div>
            <select
              name="electricBill"
              value={formData.electricBill}
              onChange={handleChange}
              className="w-full px-3 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="" disabled>
                Monthly Electric Bill
              </option>
              <option value="1000-2000">Rs1000-2000</option>
              <option value="2000-3000">Rs2000-3000</option>
              <option value="3000-4000">Rs3000-4000</option>
              <option value="4000-5000">Rs4000-5000</option>
              <option value="5000+">Rs5000 and above</option>
            </select>
            {errors.electricBill && (
              <p className="text-red-100 text-sm">{errors.electricBill}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-2/3 py-2 get-consultation-btn text-center lg:ms-36 btncolor rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Get Free Consultation
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
