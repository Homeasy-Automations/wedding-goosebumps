"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          sourcePage: "/inquire",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      setStatus("Your inquiry has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        window.location.href = "/inquire?success=true";
      }, 2000);
    } catch (err) {
      console.error("Failed to send inquiry:", err);
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 max-w-lg text-left"
    >
      {/* Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none bg-transparent py-2"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email ID</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none bg-transparent py-2"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Contact No</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none bg-transparent py-2"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Your Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={1}
          className="w-full border-b border-gray-400 focus:outline-none bg-transparent py-2 resize-none"
          required
        />
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-neutral-200 text-black uppercase tracking-wide text-sm disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Your Inquiry"}
      </motion.button>

      {status && (
        <p className="text-sm mt-2 text-gray-700">
          {status}
        </p>
      )}
    </form>
  );
}
