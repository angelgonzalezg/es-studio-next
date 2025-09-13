import React from 'react'
import Image from 'next/image'
import Title from '@/components/ui/Title'
import PageDivider from '@/components/ui/PageDivider'


function About() {
  return (
    <section className="pt-25">
      <Title
        title={"Cada detalle habla de ti \n Cada espacio cuenta su historia"}
      >
      </Title>
      <PageDivider />
      <Image
        src="/images/designer.png"
        alt="Designer Mind"
        width={250}
        height={250}
        className="mx-auto mt-10 cursor-default"
      />
      <div className="flex flex-col justify-center items-center bg-oak text-white text-xs md:text-base mt-12 p-12 px-100 cursor-default">
        <h3
          className="font-semibold text-base md:text-2xl text-center p-8 cursor-default">
          ¿Quiénes somos?
        </h3>
        <p>Somos un estudio de diseño de interiores apasionado por crear espacios únicos que
          inspiren. Escuchamos tus ideas, entendemos tus nececidades y las plasmamos en soluciones
          creativas y funcionales.<br />Creemos profundamente que los espacios hablan. Que cuentan historias,
          revelan costumbres, guardan momentos y tienen la capacidad de transformar cómo vivimos, cómo nos
          sentimos y cómo nos relacionamos.
        </p>
      </div>


    </section>
  )
}

export default About