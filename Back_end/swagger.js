const objectId = {
    type: "string",
    pattern: "^[a-fA-F0-9]{24}$",
    example: "507f1f77bcf86cd799439011"
};

const employeeProperties = {
    firstName: { type: "string", example: "Amit" },
    lastName: { type: "string", example: "Sharma" },
    email: { type: "string", format: "email", example: "amit@example.com" },
    password: { type: "string", format: "password", example: "secret123" },
    mobile: { type: "string", example: "9876543210" },
    dob: { type: "string", format: "date", example: "1995-05-20" },
    gender: { type: "string", enum: ["Male", "Female", "Other"], example: "Male" },
    profilePicture: { type: "string", nullable: true, example: "https://example.com/profile.jpg" },
    address: { type: "string", example: "12 Main Street" },
    country: { type: "string", example: "India" },
    state: { type: "string", example: "Maharashtra" },
    city: { type: "string", example: "Pune" },
    pincode: { type: "string", example: "411001" },
    jobTitle: { type: "string", example: "Pharmacist" },
    companyName: { type: "string", example: "City Pharmacy" },
    experience: { type: "string", example: "3 years" },
    skills: { type: "array", items: { type: "string" }, example: ["Inventory", "Dispensing"] },
    expectedSalary: { type: "string", example: "45000" },
    website: { type: "string", format: "uri", nullable: true, example: "https://example.com" },
    linkedin: { type: "string", format: "uri", nullable: true, example: "https://linkedin.com/in/amit" },
    preferredContact: { type: "string", example: "Email" },
    about: { type: "string", example: "Experienced pharmacy professional." },
    termsAccepted: { type: "boolean", example: true }
};

const medicineProperties = {
    MedicineName: { type: "string", example: "Paracetamol" },
    GenericName: { type: "string", example: "Acetaminophen" },
    MedicineType: { type: "string", enum: ["Syrp", "Tablet", "Injection"], example: "Tablet" },
    ManufacturerName: { type: "string", example: "ABC Pharma" },
    BatchNumber: { type: "number", example: 12345 },
    ExpiryDate: { type: "string", format: "date", example: "2027-12-31" },
    MRP: { type: "number", example: 50 },
    SellingPrice: { type: "number", example: 45 },
    StockQuantity: { type: "number", example: 100 },
    Description: { type: "string", example: "For temporary relief of fever and pain." }
};

const required = properties => Object.keys(properties).filter(field =>
    !["profilePicture", "website", "linkedin"].includes(field)
);

const idParameter = {
    name: "id",
    in: "path",
    required: true,
    description: "MongoDB document ID",
    schema: objectId
};
const notFoundResponse = {
    description: "Document not found",
    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
};

const serverErrorResponse = {
    description: "Server error",
    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
};

const crudPaths = (resource, singular, schemaName) => ({
    [`/api/${resource}/all`]: {
        get: {
            tags: [singular],
            summary: `Get all ${resource}`,
            responses: {
                200: {
                    description: `List of ${resource}`,
                    content: { "application/json": { schema: { type: "array", items: { $ref: `#/components/schemas/${schemaName}` } } } }
                },
                500: serverErrorResponse
            }
        }
    },
    [`/api/${resource}/{id}`]: {
        parameters: [idParameter],
        get: {
            tags: [singular],
            summary: `Get ${singular} by ID`,
            responses: {
                200: { description: `${singular} details`, content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
                500: serverErrorResponse
            }
        },
        put: {
            tags: [singular],
            summary: `Update ${singular}`,
            requestBody: {
                required: true,
                content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}Input` } } }
            },
            responses: {
                200: { description: `${singular} updated`, content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
                404: notFoundResponse,
                500: serverErrorResponse
            }
        },
        delete: {
            tags: [singular],
            summary: `Delete ${singular}`,
            responses: {
                200: { description: `${singular} deleted` },
                404: notFoundResponse,
                500: serverErrorResponse
            }
        }
    },
    [`/api/${resource}/add`]: {
        post: {
            tags: [singular],
            summary: `Create ${singular}`,
            requestBody: {
                required: true,
                content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}Input` } } }
            },
            responses: {
                201: { description: `${singular} created`, content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
                500: serverErrorResponse
            }
        }
    }
});

const swaggerSpec = {
    openapi: "3.0.3",
    info: {
        title: "Pharmacy API",
        version: "1.0.0",
        description: "Interactive API documentation for the employee and medicine services."
    },
    servers: [{ url: "http://localhost:5000", description: "Local server" }],
    tags: [{ name: "employee", description: "Employee management" }, { name: "medicine", description: "Medicine management" }],
    paths: {
        ...crudPaths("employee", "Employee", "Employee"),
        ...crudPaths("medicine", "Medicine", "Medicine")
    },
    components: {
        schemas: {
            EmployeeInput: { type: "object", required: required(employeeProperties), properties: employeeProperties },
            Employee: { allOf: [{ $ref: "#/components/schemas/EmployeeInput" }, { type: "object", properties: { _id: objectId, createdAt: { type: "string", format: "date-time" }, updatedAt: { type: "string", format: "date-time" } } }] },
            MedicineInput: { type: "object", required: required(medicineProperties), properties: medicineProperties },
            Medicine: { allOf: [{ $ref: "#/components/schemas/MedicineInput" }, { type: "object", properties: { _id: objectId, createdAt: { type: "string", format: "date-time" }, updatedAt: { type: "string", format: "date-time" } } }] },
            Error: { type: "object", properties: { message: { type: "string", example: "Something went wrong" }, err: { type: "string" } } }
        }
    }
};
export default swaggerSpec;