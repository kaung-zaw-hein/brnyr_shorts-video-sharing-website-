import React from 'react';

import { footerList1, footerList2 } from '../utils/constants';

const List = ( { items, mt } : { items : string[], mt: Boolean } ) => (
    <div className={`flex flex-wrap gap-2 ${ mt && 'mt-5'}`}>
      {items.map((item) => (
        <p key={item} className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-yellow-400" >
          {item}
        </p>
      ))}
    </div>
  )

const Footer = () => {
  return (
    <div className="hidden mt-6 xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <p className="mt-5 text-sm text-gray-400">Brnyr Shorts</p>
    </div>
  )
}

export default Footer