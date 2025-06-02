import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ProgressPage = () => {
  const [budgetData, setBudgetData] = useState({
    projectName: "",
    fiscalYear: "",
    fundingSource: "",
    totalBudget: "",
    items: [
      {
        description: "",
        volume: "",
        unit: "",
        unitPrice: "",
        total: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...budgetData.items];
    newItems[index] = {
      ...newItems[index],
      [name]: value,
      // Auto-calculate total if volume or unitPrice changes
      ...(name === "volume" || name === "unitPrice"
        ? {
            total:
              name === "volume"
                ? Number(value) * Number(newItems[index].unitPrice || 0)
                : Number(newItems[index].volume || 0) * Number(value),
          }
        : {}),
    };

    setBudgetData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const addItem = () => {
    setBudgetData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          volume: "",
          unit: "",
          unitPrice: "",
          total: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const newItems = budgetData.items.filter((_, i) => i !== index);
    setBudgetData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate total budget
    const calculatedTotal = budgetData.items.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0,
    );

    const finalData = {
      ...budgetData,
      totalBudget: calculatedTotal,
    };

    console.log("Budget Data to Submit:", finalData);
    // Here you would typically send the data to your API
    alert("Budget submitted successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="pt-28 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Icon icon="mdi:finance" className="text-blue-500" />
            Tambah Anggaran Proyek
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Project Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Informasi Proyek
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nama Proyek
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={budgetData.projectName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Tahun Anggaran
                  </label>
                  <input
                    type="text"
                    name="fiscalYear"
                    value={budgetData.fiscalYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Sumber Dana
                  </label>
                  <select
                    name="fundingSource"
                    value={budgetData.fundingSource}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih Sumber Dana</option>
                    <option value="APBD">APBD</option>
                    <option value="APBN">APBN</option>
                    <option value="Bansos">Bantuan Sosial</option>
                    <option value="Swadaya">Swadaya Masyarakat</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Total Anggaran
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      Rp
                    </span>
                    <input
                      type="number"
                      name="totalBudget"
                      value={budgetData.totalBudget}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Items */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                  Rincian Anggaran
                </h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  <Icon icon="mdi:plus" />
                  Tambah Item
                </button>
              </div>

              {budgetData.items.map((item, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">
                      Item #{index + 1}
                    </h3>
                    {budgetData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon icon="mdi:trash" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Deskripsi
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Volume
                      </label>
                      <input
                        type="number"
                        name="volume"
                        value={item.volume}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Satuan
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Harga Satuan
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          name="unitPrice"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full pl-10 pr-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Total
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          name="total"
                          value={item.total}
                          readOnly
                          className="w-full pl-10 pr-3 py-2 border rounded bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
              >
                <Icon icon="mdi:content-save" />
                Simpan Anggaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
