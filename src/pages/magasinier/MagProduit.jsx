import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,NavLink } from 'react-router-dom'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'
import Box from '../../components/BoxMag'
import search from "./../../assets/img/search.png"

export default function MagProduit() {

    const { id, num } = useParams()
    const [pages, setPages] = useState(1)
    const [data, setData] = useState([])
    const [q, setQ] = useState(1)
    const navig = useNavigate()

    useEffect(() => {
        let a = num - 1
        let r = a % 5
        setQ((a - r) / 5)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:4500/produit/nombre", requestOptions)
            .then(response => response.text())
            .then(result => setPages(parseInt(result / 8) + 1))
            .catch(error => console.log('error', error));

        fetch("http://localhost:4500/produit/pagination/" + a + "/8", requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result).response))
            .catch(error => console.log('error', error));

    }, [num])


    return (
        <div className='body page'>
            <Header />
            <main>
                <Nav mag={id} />
                <div className="sam">
                    <div>
                        <span className='chemin'>Acceuil</span>
                        <span className='chemin'>Produits</span>
                    </div>
                    <div className="toutcat"><span>Toutes les catégories</span></div>
                </div>
                <div className='searchs'>
                    <div>
                        <button className="imprim">Imprimer</button>
                        <button className="imprim">Imprimer pub</button>
                        <button className="refresh">Rafraichir</button>
                    </div>
                    <div className="formu">
                        <input type="text" id="code" maxLength={7} placeholder="Qte" />
                        <input type="text" id="code" maxLength={7} placeholder="Code Fournisseur" />
                        <input type="text" id="code" maxLength={7} placeholder="Code du produit" />
                        <button className="search"><img className="loupe" alt='te' src={search} /></button>
                    </div>
                </div>
                <div className="pBox">

                    {data.map((d, idx) => (<Box key={idx} number={d.codePro} quantity={d.qte} />))}

                </div>
                <div className="pagination">
                    <div className="nume">
                        <span onClick={() => {
                            if (num > 1) {
                                navig("/magasinier/" + id + "/produit/" + (num - 1))
                            }
                        }} href="#">&laquo;</span>
                        {5*q+1<=pages && <NavLink to={`/magasinier/${id}/produit/${5*q+1}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+1}</NavLink>}
                        {5*q+2<=pages && <NavLink to={`/magasinier/${id}/produit/${5*q+2}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+2}</NavLink>}
                        {5*q+3<=pages && <NavLink to={`/magasinier/${id}/produit/${5*q+3}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+3}</NavLink>}
                        {5*q+4<=pages && <NavLink to={`/magasinier/${id}/produit/${5*q+4}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+4}</NavLink>}
                        {5*q+5<=pages && <NavLink to={`/magasinier/${id}/produit/${5*q+5}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+5}</NavLink>}
                        <span onClick={() => {
                            if (num < pages) {
                                let a = num - 1 + 2
                                navig("/magasinier/" + id + "/produit/" + a)
                            }
                        }} href="#">&raquo;</span>
                    </div>
                    <div className="nbpage">
                        {num}/{pages}
                    </div>
                </div>
            </main>
        </div>
    )
}
