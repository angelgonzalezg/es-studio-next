import React from 'react'
import PageDivider from './PageDivider';

type TitleProps = {
  title: string;
  description?: string;
}

const Title = ({ title, description }: TitleProps) => {
  return (
    <>
      <h1
        className="font-serif text-3xl md:text-4xl text-center pb-0 cursor-default whitespace-pre-line">
        {title}
      </h1>
      <PageDivider />
      <p
        className="font-sans text-sm md:text-base text-center px-10 cursor-default whitespace-pre-line">
        {description}
      </p>
    </>
  )
}

export default Title