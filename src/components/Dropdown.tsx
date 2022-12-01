import React, { Dispatch, useState } from 'react'
import css from './Dropdown.module.sass'
import { ReactComponent as DropdownArrow } from './assets/icons/dropdown-arrow.svg'

type Props = {
  title: string
  curItem: any
  setItem: Dispatch<any>
  values: string[]
  children?: React.ReactNode
}

let Dropdown = ({ title, curItem, setItem, values, children }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={css.container}>
      <div className={css.title} onClick={() => setOpen(!open)}>
        {title}: {curItem}
        <DropdownArrow className={open ? css.rotate : ''} />
      </div>
      {open && (
        <div className={`${css.options}`}>
          {values.map((val, _) => (
            <li
              className={val === curItem ? css.active : ''}
              onClick={() => setItem(val)}
            >
              {val}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
