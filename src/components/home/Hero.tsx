import Link from "next/link";
import Image from "next/image";
import React from "react";

import WaveDivider from "../ui/WaveDivider";
import Button from "../ui/Button";

import logo from '../../../public/images/es_logo.png';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col h-screen pt-45">
      <div
        className="flex flex-col md:flex-row justify-center items-center px-6">
        <div className="w-50 md:w-85">
          <Link href="/">
            <Image
              src={logo}
              alt="ES-Logo"
              width={400}
              priority // inmediate download
              className="object-contain" // maintain proportions 
            />
          </Link>
        </div>
        <div className="md:text-center leading-normal">
          <h1 className="text-xl md:text-3xl md:mt-15 md:py-5 mb-5 cursor-default">
            <span className="font-semibold text-black">Estética atemporal</span>,<br />
            espacios que <span className="font-semibold text-black">inspiran.</span>
          </h1>
          <div className="flex justify-center items-center gap-5">
            <Link href="/about">
              <Button
                text="Acerca"
              />
            </Link>
            <Link href="/projects"
              className="text-sm md:text-base relative group overflow-hidden">
              Ver proyectos
              <span className="md:opacity-0 pl-1 translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
      <WaveDivider />
      <div className="flex flex-grow bg-oak"></div>
    </section>
  )
}

export default Hero