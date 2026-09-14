import { useState } from "react";
const emptyFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    dob: "",
    gender: "",
    profilePicture: null,
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    jobTitle: "",
    companyName: "",
    experience: "",
    skills: [],
    expectedSalary: "",
    website: "",
    linkedin: "",
    preferredContact: "",
    about: "",
    termsAccepted: false,
};

function EmployeeForm() {
    const [formData, setFormData] = useState(emptyFormData);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

    const resetForm = () => {
        setFormData({ ...emptyFormData, skills: [] });
        setErrors({});
    };

    // Handle text, select, radio, checkbox and file inputs
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox" && name === "skills") {
            setFormData((prev) => ({
                ...prev,
                skills: checked
                    ? [...prev.skills, value]
                    : prev.skills.filter((skill) => skill !== value),
            }));
            return;
        }

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
            return;
        }

        if (type === "file") {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must contain 10 digits";
        }

        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select gender";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.country) {
            newErrors.country = "Please select country";
        }

        if (!formData.state) {
            newErrors.state = "Please select state";
        }

        if (!formData.city) {
            newErrors.city = "Please select city";
        }

        if (!formData.pincode) {
            newErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Pincode must contain 6 digits";
        }

        if (!formData.jobTitle.trim()) {
            newErrors.jobTitle = "Job title is required";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }

        if (!formData.experience) {
            newErrors.experience = "Experience is required";
        }

        if (formData.skills.length === 0) {
            newErrors.skills = "Select at least one skill";
        }

        if (!formData.expectedSalary) {
            newErrors.expectedSalary = "Expected salary is required";
        }

        if (!formData.preferredContact) {
            newErrors.preferredContact = "Select preferred contact method";
        }

        if (!formData.about.trim()) {
            newErrors.about = "Please tell us something about yourself";
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = "You must accept the terms";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage({ type: "", text: "" });

        const employeeData = {
            ...formData,
            profilePicture: formData.profilePicture?.name || null,
        };
        delete employeeData.confirmPassword;

        try {
            const response = await fetch("http://localhost:5000/api/employee/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to register employee");
            }

            setSubmitMessage({
                type: "success",
                text: "Employee registered successfully.",
            });
            resetForm();
        } catch (error) {
            setSubmitMessage({
                type: "error",
                text: error.message || "Could not connect to the server.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Employee Registration
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Please fill in all the required information
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            1. Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Mobile */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number *
                                </label>

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    maxLength="10"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.mobile && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            {/* DOB */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth *
                                </label>

                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.dob && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.dob}
                                    </p>
                                )}
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Picture
                                </label>

                                <input
                                    type="file"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Gender *
                            </label>

                            <div className="flex gap-6">
                                {["Male", "Female", "Other"].map((gender) => (
                                    <label
                                        key={gender}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender}
                                            checked={formData.gender === gender}
                                            onChange={handleChange}
                                        />

                                        <span>{gender}</span>
                                    </label>
                                ))}
                            </div>

                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            2. Address Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address *
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter your complete address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country *
                                </label>

                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                                >
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Canada">Canada</option>
                                </select>

                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>

                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                                >
                                    <option value="">Select State</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="MadhyaPradesh">MadhyaPradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Delhi">Delhi</option>
                                </select>

                                {errors.state && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.state}
                                    </p>
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City *
                                </label>

                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                                >
                                    <option value="">Select City</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Vadodara">Vadodara</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                </select>

                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.city}
                                    </p>
                                )}
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pincode *
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength="6"
                                    placeholder="395001"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                                {errors.pincode && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.pincode}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            3. Professional Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Job Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title *
                                </label>

                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    placeholder="React Developer"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                                {errors.jobTitle && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.jobTitle}
                                    </p>
                                )}
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name *
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="ABC Technologies"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                                {errors.companyName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.companyName}
                                    </p>
                                )}
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience (Years) *
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min="0"
                                    max="50"
                                    placeholder="2"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                                {errors.experience && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.experience}
                                    </p>
                                )}
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Salary
                                </label>

                                <input
                                    type="number"
                                    name="expectedSalary"
                                    value={formData.expectedSalary}
                                    onChange={handleChange}
                                    placeholder="500000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                                {errors.expectedSalary && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.expectedSalary}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Skills *
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                    "React",
                                    "Node.js",
                                    "JavaScript",
                                    "MongoDB",
                                    "Express",
                                    "Git",
                                ].map((skill) => (
                                    <label
                                        key={skill}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name="skills"
                                            value={skill}
                                            checked={formData.skills.includes(skill)}
                                            onChange={handleChange}
                                        />

                                        <span>{skill}</span>
                                    </label>
                                ))}
                            </div>

                            {errors.skills && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.skills}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            4. Other Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>

                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn URL
                                </label>

                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Preferred Contact */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Preferred Contact *
                            </label>

                            <div className="flex gap-6">
                                {["Email", "Phone", "WhatsApp"].map((contact) => (
                                    <label
                                        key={contact}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="preferredContact"
                                            value={contact}
                                            checked={
                                                formData.preferredContact === contact
                                            }
                                            onChange={handleChange}
                                        />

                                        <span>{contact}</span>
                                    </label>
                                ))}
                            </div>

                            {errors.preferredContact && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.preferredContact}
                                </p>
                            )}
                        </div>

                        {/* About */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                About Yourself *
                            </label>

                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Tell us about yourself..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.about && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.about}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="mt-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                />

                                <span className="text-sm text-gray-700">
                                    I agree to the Terms & Conditions *
                                </span>
                            </label>

                            {errors.termsAccepted && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.termsAccepted}
                                </p>
                            )}
                        </div>
                    </div>


                    {submitMessage.text && (
                        <p
                            className={`mb-4 rounded-lg px-4 py-3 text-sm ${submitMessage.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            role="status"
                        >
                            {submitMessage.text}
                        </p>
                    )}

                    <div className="flex justify-end gap-4 border-t pt-6">

                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
export default EmployeeForm;