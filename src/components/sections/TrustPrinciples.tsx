import React from "react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Shield, Calculator, ArrowDownToDot, FileText } from "lucide-react";

export function TrustPrinciples() {
    const principles = [
        {
            title: "Transparent Assumptions",
            description: "Published ROI formula with downloadable methodology",
            icon: <Calculator className="w-6 h-6 text-blue-700" />,
            effect: "Positions ARCO as data-driven, not hype-driven"
        },
        {
            title: "Shared Risk, Not Gimmicks",
            description: "Success-based fee adjustment tied to realized savings",
            icon: <Shield className="w-6 h-6 text-blue-700" />,
            effect: "Alignment of incentives with mutual success"
        },
        {
            title: "Empirical Proof > Slogans",
            description: "Verifiable dashboards with SHA-256 hashes for independent verification",
            icon: <ArrowDownToDot className="w-6 h-6 text-blue-700" />,
            effect: "Numbers can be audited by any analyst"
        },
        {
            title: "Repeatable Process",
            description: "3-step workflow with clear artifacts and governance checkpoints",
            icon: <FileText className="w-6 h-6 text-blue-700" />,
            effect: "Signals professionalism and predictability"
        }
    ];

    return (
        <SectionWrapper className="bg-white py-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Foundational Trust Principles</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our approach is built on transparency, shared risk, and verifiable results
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {principles.map((principle, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                                {principle.icon}
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">{principle.title}</h3>
                            <p className="text-gray-600 mb-4">{principle.description}</p>
                            <div className="text-sm font-medium text-blue-700 pt-2 border-t border-gray-100">
                                {principle.effect}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
