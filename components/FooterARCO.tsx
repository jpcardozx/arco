'use client'

import Image from 'next/image'

export default function FooterARCO() {
    return (
        <footer className="relative bg-white text-neutral-900 border-t border-neutral-200 px-6 pt-24 pb-16">
            <div className="max-w-5xl mx-auto flex flex-col items-center space-y-10">

                {/* Marca como selo editorial */}
                <Image
                    src="/logo.png"
                    alt="ARCO"
                    width={100}
                    height={100}
                    className="opacity-80"
                />

                {/* Frase institucional editorial */}
                <p className="text-center text-base md:text-lg font-serif font-medium text-neutral-700 max-w-xl leading-snug">
                    Symbolic realignment for professionals who no longer explain — but must still be understood.
                </p>

                {/* Assinatura técnica sutil */}
                <p className="text-[11px] tracking-widest uppercase text-neutral-400 font-light mt-4">
                    © {new Date().getFullYear()} ARCO — Silent Diagnostic Unit
                </p>
            </div>

            {/* Linha técnica inferior */}
            <div className="mt-12 h-[1px] bg-neutral-200 opacity-20 w-full" />
        </footer>
    )
}
