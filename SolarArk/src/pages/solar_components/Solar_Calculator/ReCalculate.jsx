import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ReCalculate = () => {
    const { state: data } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure page starts at the top
    }, []); // Run only on mount

    if (!data) {
        return <p>No data available. Please calculate first.</p>;
    }

    return (
        <>
            <div className="relative h-20 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>

            <div className="md:py-14 py-1 bg-white services min-h-[400px]">
                <div className="text-center mt-8 py-2 md:my-5">
                    <h2 className="text-4xl font-bold text-black">
                        Calculations <span className="text-red-900">Result</span>
                    </h2>
                </div>

                <div className="mt-8 service-content grid grid-cols-1 md:grid-cols-2 gap-9 px-4 md:px-16 min-h-[200px] items-stretch">
                    {[
                        { title: "Monthly Consumption", value: `${data.monthlyConsumption} kWh` },
                        { title: "Energy Requirement", value: `${data.dailyEnergyRequirement} kWh` },
                        { title: "System Capacity", value: `${data.requiredSystemCapacity} kW` },
                        { title: "Area Required", value: `${data.areaRequired} sq.m` },
                        { title: "Annual Energy Generation", value: `${data.annualEnergyGeneration} kWh/year` },
                        { title: "CO2 Saving (per/year)", value: `${data.co2SavingsKg} kg` },
                        { title: "CO2 Saving Metric Tons", value: `${data.co2SavingsMetricTons} metric tons` },
                        { title: "CO2 Saving For 25 years", value: `${data.cumulativeCo2SavingsKg} kg` },
                        { title: "CO2 Saving for 25 years in Metric Tons", value: `${data.cumulativeCo2SavingsMetricTons} metric tons` },
                        { title: "Equivalent Trees Planted", value: `${data.equivalentTreesPlantedPerYear} trees/year` },
                        { title: "Cumulative Trees Over 25 Years", value: `${data.cumulativeEquivalentTreesPlanted} trees/year` }
                    ].map((item, index) => (
                        <div key={index} className="w-full min-h-[230px] md:min-h-[200px] flex flex-col justify-between p-8 bg-white shadow-lg text-center border rounded-lg border-red-900">
                            <div className="text-2xl font-semibold text-red-900">{item.title}</div>
                            <p className="my-3 font-bold">{item.value}</p>
                            <div className="mt-4 w-16 mx-auto border-b-2 border-orange-700"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-8 px-5 md:px-16 md:py-0">
                <Link
                    to="/solar_calculator"
                    className="text-xl text-center mb-6 bg-red-900 text-white py-2 rounded p-2"
                >
                    Recalculate
                </Link>
                <p className="text-xs my-3">
                    <strong>*Disclaimer:</strong> The solar calculator provides estimated savings,
                    system size, and performance based on user inputs and assumptions.
                    Electricity rates may vary across states, and actual savings
                    depend on multiple factors. The results generated are for
                    informational purposes only and do not constitute a guarantee of
                    actual performance. External factors such as weather conditions,
                    shading, panel orientation, energy consumption patterns, and
                    installation quality can significantly impact system efficiency.
                    We recommend consulting our experts for a comprehensive and
                    precise evaluation tailored to your specific needs.
                </p>
            </div>
        </>
    );
};

export default ReCalculate;
