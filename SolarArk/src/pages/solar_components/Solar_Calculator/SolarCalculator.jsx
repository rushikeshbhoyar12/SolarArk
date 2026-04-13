import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

const SolarCalculator = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [category, setCategory] = useState("");
  const [monthlyBill, setMonthlyBill] = useState(0);
  const [roofArea, setRoofArea] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [plantCapacity, setPlantCapacity] = useState(0);
  const [sanctionLoad, setSanctionLoad] = useState(0);
  const [unit, setUnit] = useState("sqFeet");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const fallbackStates = [
    { _id: 1, name: "Andhra Pradesh" },
    { _id: 2, name: "Arunachal Pradesh" },
    { _id: 3, name: "Assam" },
    { _id: 4, name: "Bihar" },
    { _id: 5, name: "Chhattisgarh" },
    { _id: 6, name: "Goa" },
    { _id: 7, name: "Gujrat" },
    { _id: 8, name: "Haryana" },
    { _id: 9, name: "Himachal Pradesh" },
    { _id: 10, name: "Jharkhand" },
    { _id: 11, name: "Karnataka" },
    { _id: 12, name: "Kerala" },
    { _id: 13, name: "Madhya Pradesh" },
    { _id: 14, name: "Maharashtra" },
  ];

  // Fetch states from the backend API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("http://localhost:5800/api/states"); // API endpoint to fetch states
        const data = await response.json();
        setStates(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates(fallbackStates);
      }
    };

    fetchStates();
  }, []);

  // Handle Calculate Button Click
  const handleCalculate = (event) => {
    event.preventDefault();
    const billString = String(monthlyBill); // Convert to string for validation

    if (!billString || Number(billString) <= 0 || billString.startsWith("0")) {
      setErrors((prev) => ({
        ...prev,
        monthlyBill:
          "Enter a valid amount greater than 0 and should not start with 0",
      }));
      return;
    }

    const tariffRate = 6;
    const roofAreaPerKW = unit === "sqMeter" ? 10 : 100;
    const solarHours = 5;
    const co2EmissionFactor = 0.85;
    const yearsOfSavings = 25;
    const treeAbsorptionRate = 21;
    const costPerKW = 50000;

    // Step 1: Calculate monthly consumption in kWh
    const monthlyConsumption = parseFloat(
      (monthlyBill / tariffRate).toFixed(2)
    );

    // Step 2: Calculate daily energy
    const dailyEnergyRequirement = parseFloat(
      (monthlyConsumption / 30).toFixed(2)
    );

    // Step 3: Calculate system capacity
    let requiredSystemCapacity = parseFloat(
      (dailyEnergyRequirement / solarHours).toFixed(2)
    );

    // Step 4: Check if the available area is sufficient
    let areaRequired = parseFloat(
      (requiredSystemCapacity * roofAreaPerKW).toFixed(2)
    ); // Adjusted to use `roofAreaPerKW`

    // Calculate CO2 savings
    const annualEnergyGeneration = parseFloat(
      (requiredSystemCapacity * solarHours * 365).toFixed(2)
    );
    const co2SavingsKg = parseFloat(
      (annualEnergyGeneration * co2EmissionFactor).toFixed(2)
    );
    const co2SavingsMetricTons = parseFloat((co2SavingsKg / 1000).toFixed(2));

    const cumulativeCo2SavingsKg = parseFloat(
      (co2SavingsKg * yearsOfSavings).toFixed(2)
    );
    const cumulativeCo2SavingsMetricTons = parseFloat(
      (cumulativeCo2SavingsKg / 1000).toFixed(2)
    );

    // Tree plantation calculation
    const equivalentTreesPlantedPerYear = parseFloat(
      (co2SavingsKg / treeAbsorptionRate).toFixed(2)
    );
    const cumulativeEquivalentTreesPlanted = parseFloat(
      (equivalentTreesPlantedPerYear * yearsOfSavings).toFixed(2)
    );

    const resultData = {
      monthlyConsumption,
      dailyEnergyRequirement,
      requiredSystemCapacity,
      areaRequired,
      annualEnergyGeneration,
      co2SavingsKg,
      co2SavingsMetricTons,
      cumulativeCo2SavingsKg,
      cumulativeCo2SavingsMetricTons,
      equivalentTreesPlantedPerYear,
      cumulativeEquivalentTreesPlanted,
    };

    navigate("/recalculate", { state: resultData });
  };

  // form 1

  // form 1

  return (
    <>
      <div className="relative h-40 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>

      {/* {isVisible && ( */}
      <div className="fade-in-bottom min-h-screen flex items-center justify-center">
        <div className="shadow-lg rounded-lg max-w-5xl w-full p-6 sm:p-8 mb-4 bg-gray-100">
          <h1 className="text-2xl font-semibold text-center mb-6 bg-red-900 text-white py-2 rounded-t-lg">
            Solar Rooftop Calculator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Left section */}
            <form onSubmit={handleCalculate}>
              <div className="p-4">
                <h2 className="text-lg font-medium text-center text-gray-800 mb-4">
                  Please Enter The Following Details
                </h2>

                {/* Category Field */}
                <div className="flex flex-col mb-4">
                  <label className="text-gray-700 mb-2 font-bold">
                    Your Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Residential">Residential</option>
                  </select>
                  {errors.category && (
                    <span className="text-red-500 text-sm">
                      {errors.category}
                    </span>
                  )}
                </div>
                {/* area */}
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 mr-4 font-bold">
                    Total Available Roof Top Area
                  </span>
                  <label className="mr-2">
                    <input
                      type="radio"
                      value="sqMeter"
                      checked={unit === "sqMeter"}
                      onChange={() => setUnit("sqMeter")}
                      className="mr-1"
                    />
                    Sq. m.
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="sqFeet"
                      checked={unit === "sqFeet"}
                      onChange={() => setUnit("sqFeet")}
                      className="mr-1"
                    />
                    Sq. Feet
                  </label>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-gray-700 mb-2 font-bold">
                    Total Available Roof Top Area{" "}
                    <span className="font-normal">(optional)</span>
                  </label>
                  <input
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    placeholder="0"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Monthly Bill Field */}
                <div className="flex flex-col mb-4">
                  <label className="text-gray-700 mb-2 font-bold">
                    Average Monthly Bill
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-l-md">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => {
                        setMonthlyBill(e.target.value);
                        setErrors({ ...errors, monthlyBill: "" }); // Clear error on change
                      }}
                      placeholder="Enter amount"
                      className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    />
                  </div>
                  {errors.monthlyBill && (
                    <span className="text-red-500 text-sm">
                      {errors.monthlyBill}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    onClick={handleCalculate}
                    className="py-2 px-6 bg-red-900 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-200"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </form>

            {/* Right section */}
            
          </div>

          <div>
            <p className="text-xs my-3 px-4">
              <strong>*Disclaimer:</strong> The solar calculator provides
              estimated savings, system size, and performance based on user
              inputs and assumptions. Electricity rates may vary across states,
              and actual savings depend on multiple factors. The results
              generated are for informational purposes only and do not
              constitute a guarantee of actual performance. External factors
              such as weather conditions, shading, panel orientation, energy
              consumption patterns, and installation quality can significantly
              impact system efficiency. We recommend consulting our experts for
              a comprehensive and precise evaluation tailored to your specific
              needs
            </p>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default SolarCalculator;
