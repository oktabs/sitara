import connectDB from "../../../../../lib/mongodb";
import Employee from "../../../../../models/employeeModel";

export default async function handler(req, res) {
  await connectDB;
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ success: false, message: "Karyawan tidak ditemukan" });
        return res.status(200).json({ success: true, data: employee });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Gagal mengambil data karyawan" });
      }

    case "PUT":
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ success: true, message: "Karyawan berhasil diperbarui", data: updatedEmployee });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Gagal memperbarui data karyawan" });
      }

    case "DELETE":
      try {
        await Employee.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Karyawan berhasil dihapus" });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Gagal menghapus karyawan" });
      }

    default:
      return res.status(405).json({ success: false, message: "Method tidak diizinkan" });
  }
}
