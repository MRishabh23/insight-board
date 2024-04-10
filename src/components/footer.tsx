import { cn } from '@/lib/utils';
import React from 'react'

const Footer = () => {
  return (
    <footer className={cn("h-[50px] flex justify-center items-center border-t text-sm sm:text-base")}>
        ©{new Date().getFullYear()} JUSTRANSFORM - All Rights Reserved.
    </footer>
  )
}

export default React.memo(Footer);