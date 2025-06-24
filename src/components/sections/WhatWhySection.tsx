import React from "react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function WhatWhySection() {
    const { t } = useTranslation();

    // Get translation with proper fallback
    const financeContent = t("financeContent");

    // Default fallback values
    const whatWeDoDefaults = {
        title: "Fractional Ops & Performance Partner",
        subtitle: "Not a SaaS broker, not an agency",
        weDo: [
            "Digital asset performance optimization",
            "SaaS cost reduction through utilization analysis",
            "Technical debt remediation with ROI tracking",
            "Evidence-based performance optimization with clear metrics"
        ],
        weDont: [
            "Short-term 'quick fixes' without long-term value",
            "Vendor-biased SaaS recommendations",
            "Marketing services or redesigns",
            "Generic IT consulting without verifiable ROI"
        ]
    };

    // Create content object with proper fallbacks
    const content = {
        whatWeDo: (financeContent && typeof financeContent === 'object' && 'whatWeDo' in financeContent)
            ? (financeContent as any).whatWeDo
            : whatWeDoDefaults
    };

    return (
        <SectionWrapper className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.whatWeDo.title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {content.whatWeDo.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* What We Do */}
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="bg-green-100 text-green-700 p-2 rounded-full mr-3">
                                <Check className="w-5 h-5" />
                            </span>
                            We Do
                        </h3>                        <ul className="space-y-4">
                            {content.whatWeDo.weDo.map((item: string, index: number) => (
                                <li key={index} className="flex">
                                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What We Don't */}
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="bg-red-100 text-red-700 p-2 rounded-full mr-3">
                                <X className="w-5 h-5" />
                            </span>
                            We Don't
                        </h3>                        <ul className="space-y-4">
                            {content.whatWeDo.weDont.map((item: string, index: number) => (
                                <li key={index} className="flex">
                                    <X className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
