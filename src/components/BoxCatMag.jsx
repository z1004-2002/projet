import React, { useEffect, useState } from 'react'
import litsearch from './../assets/img/litsearch.png'
import { NavLink,useParams } from 'react-router-dom';

export default function BoxCat({ idCat, nomCat }) {
  const [nombre, setNombre] = useState(0)
  const { id } = useParams()
  useEffect(() => {

    console.log(idCat);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4500/produit/nombre/" + idCat, requestOptions)
      .then(response => response.text())
      .then(result => setNombre(result))
      .catch(error => console.log('error', error));

  }, [idCat])
  return (
    <div className="ppBox">
      <div className="num"><span>{nomCat}</span></div>
      <hr />
      <div className="qte"><span>{nombre}</span>
      <NavLink to={"/magasinier/"+id+"/produit/"+idCat+"/1"}>
        <img className="ploupe" src={litsearch} alt='test'/>
      </NavLink>
      </div>
    </div>
  )
}
