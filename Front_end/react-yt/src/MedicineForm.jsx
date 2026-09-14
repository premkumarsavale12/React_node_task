import { useState } from "react";

const emptyForm = {
    MedicineName: "",
    GenericName: "",
    MedicineType: "",
    ManufacturerName: "",
    BatchNumber: "",
    ExpiryDate: "",
    MRP: "",
    SellingPrice: "",
    StockQuantity: "",
    Description: "",
};

const fieldGroups = [
    {
        title: "Medicine details",
        fields: [
            ["MedicineName", "Medicine name", "text", "e.g. Paracetamol 500mg"],
            ["GenericName", "Generic name", "text", "e.g. Paracetamol"],
            ["MedicineType", "Medicine type", "select"],
            ["ManufacturerName", "Manufacturer", "text", "e.g. ABC Pharma"],
        ],
    },
    {
        title: "Stock and pricing",
        fields: [
            ["BatchNumber", "Batch number", "number", "e.g. 123456"],
            ["ExpiryDate", "Expiry date", "date"],
            ["MRP", "MRP", "number", "0.00"],
            ["SellingPrice", "Selling price", "number", "0.00"],
            ["StockQuantity", "Stock quantity", "number", "0"],
        ],
    },
];

function MedicineForm() {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = ({ target }) => {
        setFormData((current) => ({ ...current, [target.name]: target.value }));
        setErrors((current) => ({ ...current, [target.name]: "" }));
        setStatus({ type: "", message: "" });
    };

    const validate = () => {
        const nextErrors = {};

        Object.entries(formData).forEach(([name, value]) => {
            if (!String(value).trim()) nextErrors[name] = "This field is required";
        });

        if (formData.MedicineType && !["Syrp", "Tablet", "Injection"].includes(formData.MedicineType)) {
            nextErrors.MedicineType = "Choose a valid medicine type";
        }

        ["MRP", "SellingPrice", "StockQuantity"].forEach((name) => {
            if (formData[name] && Number(formData[name]) < 0) {
                nextErrors[name] = "Enter a positive number";
            }
        });

        if (formData.MRP && formData.SellingPrice && Number(formData.SellingPrice) > Number(formData.MRP)) {
            nextErrors.SellingPrice = "Selling price cannot exceed MRP";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        const medicineData = {
            ...formData,
            BatchNumber: Number(formData.BatchNumber),
            MRP: Number(formData.MRP),
            SellingPrice: Number(formData.SellingPrice),
            StockQuantity: Number(formData.StockQuantity),
        };

        try {
            const response = await fetch("http://localhost:5000/api/medicine/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([medicineData]),
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Could not add medicine");

            setStatus({ type: "success", message: "Medicine added to inventory." });
            resetForm();
        } catch (error) {
            setStatus({ type: "error", message: error.message || "Could not connect to the server." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f7f5] px-4 py-8 text-slate-900 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Inventory / New entry</p>
                        <h1 className="text-4xl font-black tracking-tight text-slate-950">Add medicine</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-500">Create a clear, trackable record for your pharmacy inventory.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
                    <div className="space-y-6">
                        {fieldGroups.map((group) => (
                            <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                                <h2 className="mb-5 text-lg font-bold text-slate-950">{group.title}</h2>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {group.fields.map(([name, label, type, placeholder]) => (
                                        <label key={name} className="block">
                                            <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                                            {type === "select" ? (
                                                <select name={name} value={formData[name]} onChange={handleChange} className="field-input">
                                                    <option value="">Select type</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="Syrp">Syrup</option>
                                                    <option value="Injection">Injection</option>
                                                </select>
                                            ) : (
                                                <input name={name} type={type} value={formData[name]} onChange={handleChange} placeholder={placeholder} min={type === "number" ? "0" : undefined} step={name === "MRP" || name === "SellingPrice" ? "0.01" : undefined} className="field-input" />
                                            )}
                                            {errors[name] && <span className="mt-1 block text-xs font-medium text-rose-600">{errors[name]}</span>}
                                        </label>
                                    ))}
                                </div>
                            </section>
                        ))}

                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
                                <textarea name="Description" value={formData.Description} onChange={handleChange} rows="4" placeholder="Add dosage, usage, or storage notes" className="field-input resize-y" />
                                {errors.Description && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.Description}</span>}
                            </label>
                        </section>
                    </div>

                    <aside className="h-fit rounded-2xl bg-slate-950 p-6 text-white shadow-lg lg:sticky lg:top-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Ready to save</p>
                        <h2 className="mt-3 text-2xl font-black">One record, fully tracked.</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-300">Complete every field so pricing, stock, and expiry data stay useful to your team.</p>
                        {status.message && <div className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold ${status.type === "success" ? "bg-emerald-400/15 text-emerald-200" : "bg-rose-400/15 text-rose-200"}`}>{status.message}</div>}
                        <button type="submit" disabled={isSubmitting} className="mt-8 w-full rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60">
                            {isSubmitting ? "Saving medicine..." : "Add medicine"}
                        </button>
                    </aside>
                </form>
            </div>
        </main>
    );
}

export default MedicineForm;