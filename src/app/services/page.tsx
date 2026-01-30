import React from 'react'
import ServiceCard from '@/components/ui/ServiceCard'
import Title from '@/components/ui/Title'
import PageDivider from '@/components/ui/PageDivider'

function Services() {
  return (
    <section className=" min-h-screen">
      <Title
        title="Nuestros Servicios"
        description={"Nuestro enfoque se basa en la armonía entre el espacio y la persona,\nentre lo visual y lo emocional."}
      >
      </Title>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 p-6 lg:max-w-[80%] mx-auto cursor-default'>
        <ServiceCard
          title="Diseño de interiores residencial"
          description="Diseñamos a medida que reflejan tu estilo, tus nececidades y tu energía en cada rincón."
          images={{
            imageLeft: { src: "/images/housing/cabin2.png", alt: "Housing 1" },
            imageRightTop: { src: "/images/housing/cabin4.png", alt: "Housing 2" },
            imageRightBottom: { src: "/images/housing/cabin3.png", alt: "Housing 3" },
          }}
        />
        <ServiceCard
          title="Diseño de espacios comerciales"
          description="Creamos ambientes que comunican tu escencia de marca y ofrecen una experiencia memorable a tus clientes."
          images={{
            imageLeft: { src: "/images/commercial/terr1.png", alt: "Commercial 1" },
            imageRightTop: { src: "/images/commercial/com1.png", alt: "Commercial 2" },
            imageRightBottom: { src: "/images/commercial/com2.png", alt: "Commercial 3" },
          }}
        />
        <ServiceCard
          title="Remodelaciones y reformas"
          description="Rediseñamos espacios existentes para darles un nuevo enfoque."
          images={{
            imageLeft: { src: "/images/corporate/office4.png", alt: "Office 1" },
            imageRightTop: { src: "/images/corporate/office6.png", alt: "Office 2" },
            imageRightBottom: { src: "/images/corporate/office8.png", alt: "Office 3" },
          }}
        />
        <ServiceCard
          title="Asesorías personalizadas"
          description="Ofrecemos sesiones de asesoría online o presencial, desde la elección de una paleta de colores, hasta la distribución de espacios."
          images={{
            imageLeft: { src: "/images/condo/con3.png", alt: "Condo 1" },
            imageRightTop: { src: "/images/housing/hab2.png", alt: "Condo 2" },
            imageRightBottom: { src: "/images/housing/hab6.png", alt: "Condo 3" },
          }}
        />
      </div>
      <PageDivider />
      <div className="p-6 px-5">
        <h2 className="font-semibold text-base md:text-2xl text-center pb-2.5 cursor-default">
          ¿Por qué nosotros?</h2>
        <p className="text-xs md:text-base text-center cursor-default">Trabajamos de forma
          personalizada, acompañando cada etapa del proceso con claridad, empatía y compromiso,<br/>para que tu
            experiencia sea tan agradable como el resultado final.</p>
      </div>

    </section>
  )
}

export default Services