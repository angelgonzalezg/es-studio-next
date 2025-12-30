'use client';
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import WaveDivider from "../ui/WaveDivider";
import Button from "../ui/Button";

import logo from '../../../public/images/es_logo.png';
import backgroundImage from '../../../public/images/housing/cabin2.png';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col text-white h-screen pt-50">
      <Image
        src={backgroundImage}
        alt="Background Image"
        fill
        className="object-cover opacity-80 z-1"
        priority
      />
      <div
        className="relative flex flex-col md:flex-row justify-center items-center px-6 z-1">
        <motion.div
          className="w-50 md:w-85"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link href="/">
            <Image
              src={logo}
              alt="ES-Logo"
              width={400}
              priority // inmediate download
              className="object-contain" // maintain proportions 
            />
          </Link>
        </motion.div>
        <motion.div
          className="md:text-center leading-normal"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-xl md:text-3xl md:mt-15 md:py-5 mb-5 cursor-default">
            <span className="font-semibold">Estética atemporal</span>,<br />
            espacios que <span className="font-semibold">inspiran.</span>
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
        </motion.div>
      </div>
      <WaveDivider />
      <div className="flex flex-grow bg-oak opacity-35 z-1"></div>
    </section>
  )
}

export default Hero
