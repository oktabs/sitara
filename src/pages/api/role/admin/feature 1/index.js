import connectDB from "../../../../../lib/mongodb";
import Employee from "../../../../../models/employeeModel";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const employees = await Employee.find();
        return res.status(200).json({
          success: true,
          data: employees
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil data karyawan"
        });
      }

    case "POST":
      try {
        const employee = new Employee(req.body);
        await employee.save();
        return res.status(201).json({
          success: true,
          message: "Karyawan berhasil ditambahkan",
          data: employee
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Gagal menambahkan karyawan"
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method tidak diizinkan"
      });
  }
}
