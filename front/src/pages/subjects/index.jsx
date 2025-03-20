import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import ModalSubject from "../../components/modals/subject";
import Head from "../../components/head";
import Footer from "../../components/footer";
import axios from "axios";
import './styles.css'

export default function Subject() {
    const [date, setDate] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [subjectSelect, setSubjectSelect] = useState(null)
    const [setar, setSetar] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/subjects',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data)
                setDate(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [setar])

    const editS = (subject) => {
        console.log(subject)
        setSubjectSelect(subject)
        setModalOpen(true)
    }

    const deleteS = async (subject) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/subject/${subject.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log("date apagados com sucesso...")
                setSetar(!setar)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="container_subject">
            <Head />
            <section className="section-subject">
                <div className="table-subject">
                    <h2>Lista de subjects</h2>
                    {date.map((subject) => (
                        <div className="lista">
                            <div className="col1">
                                <FaEdit className="edit" onClick={() => editS(subject)} />
                            </div>
                            <div className="col2">
                                <FaTrash className="delete" onClick={() => deleteS(subject)} />
                            </div>
                            <div className="col3">
                                <span className="id">{subject.id}</span>
                            </div>
                            <div className="col4">
                                <span className="cod">{subject.code}</span>
                            </div>
                            <div className="col5">
                                <span className="sub">{subject.sub}</span>
                            </div>
                            <div className="col6">
                                <span className="quant">{subject.quant}</span>
                            </div>
                        </div>
                    ))

                    }
                </div>
                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus
                            className="add"
                            onClick={() => {
                                setSubjectSelect(null),
                                    setModalOpen(true)
                            }}
                        />
                    </div>
                    <div className="pesquisar">
                        <input placeholder="ID" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>

                <ModalSubject
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    subjectSelect={subjectSelect}
                    setSetar={setSetar}
                    setar={setar}
                />
            </section>
            <Footer />
        </div>
    )
}