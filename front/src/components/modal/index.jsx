import React, { useState, useEffect } from "react";
import './styles.css'

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    criar,
    atualizar
}) => {
    if (!isOpen) return null

    console.log("Prof Select: ", professorSelecionado)

    const [id, setId] = useState(professorSelecionado?.id || "")
    const [ni, setNi] = useState(professorSelecionado?.ni || "")
    const [nome, setNome] = useState(professorSelecionado?.nome || "")
    const [email, setEmail] = useState(professorSelecionado?.email || "")
    const [cel, setCel] = useState(professorSelecionado?.cel || "")
    const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")

    useEffect(() => {
        if (professorSelecionado) {
            setId(professorSelecionado.id)
            setNi(professorSelecionado.ni || '')
            setNome(professorSelecionado.nome || '')
            setEmail(professorSelecionado.email || '')
            setCel(professorSelecionado.cel || '')
            setOcup(professorSelecionado.ocup || '')
        } else {
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const novoProfessor = { ni, nome, email, cel, ocup }
        if (professorSelecionado) {
            atualizar({ ...professorSelecionado })
        } else {
            criar(novoProfessor)
        }
    }

    return (
        <main>
            <div className="container_modal">
                <div className="head_modal">
                    <button className="close_button">X</button>
                </div>
                <div className="body_modal">
                    <h2>{professorSelecionado ? "Editar" : "Cadastrar"}</h2>
                        <div className="caixa1">
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="ni_modal"
                                    placeholder="NI"
                                    type="text"
                                    value={ni}
                                    onChange={(e) => setNi(e.target.value)}
                                />
                                <input
                                    className="nome_modal"
                                    placeholder="Nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <input
                                    className="email_modal"
                                    placeholder="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="cel_modal"
                                    placeholder="Celular"
                                    type="text"
                                    value={cel}
                                    onChange={(e) => setCel(e.target.value)}
                                />
                                <input
                                    className="ocup_modal"
                                    placeholder="Ocupação"
                                    type="text"
                                    value={ocup}
                                    onChange={(e) => setOcup(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className="caixa2">
                            <h5>XXXX</h5>
                        </div>
                </div>
                <div className="footer_modal">
                    <button type="submit">{professorSelecionado ? "Atualizar" : "Salvar"}</button>
                </div>
            </div>
        </main>
    )

}

export default ModalProfessores