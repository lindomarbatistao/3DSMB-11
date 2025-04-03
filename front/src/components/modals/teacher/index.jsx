import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../../functions/useWindowSize";
import axios from "axios";
import './styles.css'

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    setSetar,
    setar
}) => {
    if (!isOpen) return null

    console.log("Prof Select: ", professorSelecionado)

    const [id, setId] = useState(professorSelecionado?.id || "")
    const [ni, setNi] = useState(professorSelecionado?.ni || "")
    const [nome, setNome] = useState(professorSelecionado?.nome || "")
    const [email, setEmail] = useState(professorSelecionado?.email || "")
    const [cel, setCel] = useState(professorSelecionado?.cel || "")
    const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")
    const [foto, setFoto] = useState(professorSelecionado?.foto || "")

    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState('')
    const fotoRef = useRef(null)
    const token = localStorage.getItem('token')
    const { width, height } = useWindowSize()

    useEffect(() => {
        if (professorSelecionado) {
            setId(professorSelecionado.id)
            setNi(professorSelecionado.ni || '')
            setNome(professorSelecionado.nome || '')
            setEmail(professorSelecionado.email || '')
            setCel(professorSelecionado.cel || '')
            setOcup(professorSelecionado.ocup || '')
            setFoto(professorSelecionado.foto || "")
            // Capturar Foto

        } else {
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
            setFoto('')
        }
    }, [professorSelecionado])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!ni || !nome || !email || !cel || !ocup) {
            setMessage("Preencha todos os campos!")
            return
        }

        const fileExtension = fotoRef.current.name.split(".").pop()
        const newNameFile = `${ni}_${nome.split(" ")[0]}.${fileExtension}}`
        const nameFile = new File([fotoRef.current], newNameFile, { type: fotoRef.current.type })

        const formData = new FormData()
        formData.append("ni", ni)
        formData.append("nome", nome)
        formData.append("email", email)
        formData.append("cel", cel)
        formData.append("ocup", ocup)
        formData.append("foto", nameFile)

        try {
            await axios.post('http://127.0.0.1:8000/api/professores',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setMessage("Dados enviados com sucesso!")
            console.log("Dados enviados com sucesso!");
            setPreview(null)
            onClose(true)
        } catch (error) {
            console.log("Erro ao enviar os dados: ", error);
        }


    }

    const deleteFile = async (fileName) => {
        if (fotoRef) {
            await axios.delete(`http://127.0.0.1:8000/api/delete_file/${fileName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Deletou...");

        }
    }

    const handleFileChange = (e) => {
        if (professorSelecionado) {
            const fileName = professorSelecionado.foto.split("/").pop()
            deleteFile(fileName)
        }
        const file = e.target.file[0]

        if (!file) return

        fotoRef.current = file

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview("preview: ", file)
        }

        reader.readAsDataURL(file)
        console.log("Preview XXX: ", file);


    }

    const newTeacher = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    cel: cel,
                    ocup: ocup
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

    const editTeacher = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/professor/${id}`,
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    cel: cel,
                    ocup: ocup
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
        <div className="container_modal">

            <div className="head_modal">
                <button className="close_button" onClick={onClose}>X</button>
            </div>
                <div className="caixa1_t">
                    <h2>{professorSelecionado ? "Editar" : "Cadastrar"}</h2>
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
                </div>
                <div
                    className="image1"
                    
                >
                    <img
                        src={`http://127.0.0.1:8000/api/fotos/${ni}_${nome.split(" ")[0]}.png`}
                    />
                </div>
                <div
                    className="image2"
                >
                    <form onSubmit={handleSubmit}>
                        {preview && <img src={preview} alt="Preview" className="preview" />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="fileInput"
                            
                        />

                        <button
                            type="submit"
                            className="button_save"
                            style={{
                                top: `530px`,
                                left: `400px`
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                professorSelecionado ? editTeacher(professorSelecionado.id) : handleSubmit(e)
                            }}

                        >
                            {professorSelecionado ? "Editar" : "Salvar"}
                        </button>
                    </form>
                </div>
        </div>
    )

}

export default ModalProfessores