import React, { useState, useEffect } from "react";
import axios from "axios";
// import busimage from "../../../assets/images/bus.png";
// import engineers from "../../../assets/images/engineers.jpg";
import BookingForm from "../Index/BookingForm";
import { Helmet } from "react-helmet";

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        name: "",
        email: "",
        jobPosition: "",
        experience: "",
        message: ""
    });

    // Fetch active jobs from backend
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5900/api/jobs/active");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error.message);
        }
        setLoading(false);
    };

    const handleApplicationChange = (e) => {
        const { name, value } = e.target;
        setApplicationData({ ...applicationData, [name]: value });
    };

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();
        if (!applicationData.name || !applicationData.email || !applicationData.experience || !applicationData.message) {
            alert("Please fill in all required fields!");
            return;
        }

        try {
            // Send JSON data instead of FormData
            const payload = {
                name: applicationData.name,
                email: applicationData.email,
                jobPosition: selectedJob.title,
                experience: applicationData.experience,
                message: applicationData.message
            };

            const response = await axios.post(
                "http://localhost:5000/api/careers",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            alert("✅ Application submitted successfully! We will contact you soon.");
            setShowApplicationModal(false);
            setApplicationData({
                name: "",
                email: "",
                jobPosition: "",
                experience: "",
                message: "",
                resume: null
            });
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("❌ Error submitting application: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <>
            <Helmet>
                <title>thesolarark.com | Careers | Solar Ark</title>
                <meta
                    name="description"
                    content="At SolarArk Projects Pvt. Ltd., we are shaping the future of renewable energy with innovation and excellence. Join our dynamic team and be part of a mission-driven organization committed to sustainability and technological advancement. We offer exciting career opportunities across sales, marketing, and project management, empowering professionals to grow and make a real impact. With a culture of collaboration, continuous learning, and employee well-being, we foster an environment where talent thrives. If you are passionate about solar energy and looking for a rewarding career, explore opportunities with us and help drive India's clean energy revolution."
                />
                <meta name="theme-color" content="#000000" />
                <meta name="author" content="The Solar Ark" />
                <meta name="robots" content="index, follow" />
                {/* Fallback Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Solar Ark | Careers" />
                <meta property="og:url" content="https://thesolarark.com/" />
            </Helmet>

            {/* Header Section */}
            <div className="relative h-40 sm:h-28 lg:my-10 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>

            {/* Introduction Section */}
            <div className="py-4 flex items-center justify-center">
                <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8 max-w-4xl">
                    <h1 className="text-3xl text-center font-bold text-red-900 mb-5">
                        Empower Your Career with SolarArk
                    </h1>
                    <p className="text-lg mb-6 text-wrap space-y-3">
                        At SolarArk Projects Pvt. Ltd., we are shaping the future of renewable energy with innovation and excellence. Join our dynamic team and be part of a mission-driven organization committed to sustainability and technological advancement. We offer exciting career opportunities across sales, marketing, and project management, empowering professionals to grow and make a real impact. With a culture of collaboration, continuous learning, and employee well-being, we foster an environment where talent thrives. If you are passionate about solar energy and looking for a rewarding career, explore opportunities with us and help drive India's clean energy revolution.
                    </p>
                </div>
            </div>

            {/* Jobs Listing Section */}
            <div className="py-8 flex items-center justify-center">
                <div className="w-full max-w-6xl px-4">
                    <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">Current Openings</h2>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading available positions...</p>
                    ) : jobs.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <p className="text-gray-600 text-lg">No job openings available at the moment.</p>
                            <p className="text-gray-500">Please check back soon for exciting opportunities!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                                <thead className="bg-red-600 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Position</th>
                                        <th className="px-6 py-3 text-left">Location</th>
                                        <th className="px-6 py-3 text-left">Experience</th>
                                        <th className="px-6 py-3 text-left">Job Type</th>
                                        <th className="px-6 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job._id} className="border-b hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-semibold text-gray-800">{job.title}</td>
                                            <td className="px-6 py-4 text-gray-600">📍 {job.location}</td>
                                            <td className="px-6 py-4 text-gray-600">{job.experience}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {job.jobType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedJob(job);
                                                        setShowApplicationModal(true);
                                                    }}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                                                >
                                                    Apply Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Job Details Cards Section (Alternative View) */}
            {jobs.length > 0 && (
                <div className="py-8 bg-gray-50">
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-6xl px-4">
                            <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">Job Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {jobs.map((job) => (
                                    <div key={job._id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                                        <div className="mb-4 space-y-2 text-sm text-gray-600">
                                            <p><strong>📍 Location:</strong> {job.location}</p>
                                            <p><strong>⏱️ Experience:</strong> {job.experience}</p>
                                            <p><strong>💼 Type:</strong> {job.jobType}</p>
                                            <p><strong>💰 Salary:</strong> {job.salary}</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-semibold text-gray-800 mb-2">Description:</p>
                                            <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setShowApplicationModal(true);
                                            }}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                                        >
                                            Apply for this Position
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* APPLICATION MODAL */}
            {showApplicationModal && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-red-600 text-white p-6">
                            <h2 className="text-2xl font-bold">Apply for {selectedJob.title}</h2>
                            <p className="text-red-100 mt-1">📍 {selectedJob.location}</p>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleApplicationSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={applicationData.name}
                                    onChange={handleApplicationChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={applicationData.email}
                                    onChange={handleApplicationChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Years of Experience *</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={applicationData.experience}
                                    onChange={handleApplicationChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="e.g., 3 years"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Cover Letter / Message *</label>
                                <textarea
                                    name="message"
                                    value={applicationData.message}
                                    onChange={handleApplicationChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
                                    placeholder="Tell us why you're interested in this position..."
                                    required
                                ></textarea>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex gap-3 pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowApplicationModal(false);
                                        setApplicationData({
                                            name: "",
                                            email: "",
                                            jobPosition: "",
                                            experience: "",
                                            message: ""
                                        });
                                    }}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <BookingForm />
        </>
    );
};

export default Careers;
