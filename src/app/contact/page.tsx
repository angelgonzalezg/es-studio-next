import React from 'react'
import Title from '@/components/ui/Title'
import { section } from 'framer-motion/client'

function Contact() {
  return (
    <section className="min-h-screen">
      <Title
        title={"Contacto"}
        description={"¿Listo para transformar tu espacio? \nContáctános y hagamos realidad juntos el diseño de tus sueños."}
      >
      </Title>
    </section>
  )
}

export default Contact