import React, { useEffect, useState } from 'react'
import litsearch from './../assets/img/litsearch.png'
import box from './../assets/img/box.jpeg'

export default function Box({ number, quantity }) {
  const [code, SetCode] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4500/photo/" + number, requestOptions)
      .then(response => response.text())
      .then(result => {
        let a = JSON.parse(result)
        if (a.length === 0) {
          setName(box)
        } else {
          setName('https://boutiquebambino.shop/eshop/productImages/'+number+'/' + a[0].lienPhoto)
        }
      })
      .catch(error => console.log('error', error));
    SetCode(number.toString())
  }, [number])
  return (
    <div className="ppBox">
      <div className="num"><span>{
        code[0] + code[1] + code[2] +
        '-' + code[3] + code[4] + code[5]}</span></div>
      
        <div className="pimage"><img alt='e' src={name} /></div>
      <div className="qte"><span>{quantity}</span><img alt='z' className="ploupe" src={litsearch} /></div>
    </div>
  )
}
