import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

const ModalSubject = ({
    isOpen,
    onClose,
    subjectSelect,
    setSetar,
    setar
}) => {
    if (!isOpen) return null

    console.log("Subject Select: ", subjectSelect)

    const [id, setId] = useState(subjectSelect?.id || "")
    const [code, setCode] = useState(subjectSelect?.cod || "")
    const [subject, setSubject] = useState(subjectSelect?.subject || "")
    const [quant, setQuant] = useState(subjectSelect?.quant || "")
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (subjectSelect) {
            setId(subjectSelect.id)
            setCode(subjectSelect.code || '')
            setSubject(subjectSelect.subject || '')
            setQuant(subjectSelect.quant || '')
        } else {
            setId('')
            setCode('')
            setSubject('')
            setQuant('')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (subjectSelect) {
            editSubject
        } else {
            newSubject
        }
    }

    const newSubject = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/subjects',
                {
                    cod: code,
                    sub: subject,
                    quant: quant,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados inseridos com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    const editSubject = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/professor/${subjectSelect.id}`,
                {
                    cod: code,
                    sub: subject,
                    quant: quant,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados atualizados com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    return (
        <div className="container_container">
            <div className="container_modal">
                <div className="head_modal">
                    <button className="close_button" onClick={onClose}>X</button>
                </div>
                <div className="body_modal">
                    <div className="caixa1">
                        <h2>{subjectSelect ? "Editar" : "Cadastrar"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="code_modal"
                                placeholder="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <input
                                className="subject_modal"
                                placeholder="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <input
                                className="quant_modal"
                                placeholder="quant"
                                type="text"
                                value={quant}
                                onChange={(e) => setQuant(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className="footer_modal">
                    <button
                        type="submit"
                        onClick={subjectSelect ? editSubject : newSubject}
                    >
                        {subjectSelect ? "Edit" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ModalSubject