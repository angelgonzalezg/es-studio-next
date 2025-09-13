import React from 'react'

type TitleProps = {
  title: string;
  description?: string;
}

function Title({ title, description }: TitleProps) {
  return (
    <>
      <h2
        className="font-semibold text-base md:text-2xl text-center pb-0 cursor-default whitespace-pre-line">
        {title}
      </h2>
      <p
        className="text-xs md:text-base text-center cursor-default whitespace-pre-line">
        {description}
      </p>
    </>
  )
}

export default Title