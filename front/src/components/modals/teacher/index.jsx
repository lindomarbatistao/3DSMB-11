import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './styles.css'

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
}) => {
    if (!isOpen) return null



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
    const [sizeImage, setSizeImage] = useState(0)

    useEffect(() => {
        if (!isOpen) return null;  // 🔹 Evita renderização desnecessária

        if (professorSelecionado) {
            setId(professorSelecionado.id)
            setNi(professorSelecionado.ni || '')
            setNome(professorSelecionado.nome || '')
            setEmail(professorSelecionado.email || '')
            setCel(professorSelecionado.cel || '')
            setOcup(professorSelecionado.ocup || '')
            setFoto(professorSelecionado.foto || "")
            setPreview(`http://127.0.0.1:8000/api${professorSelecionado.foto}`)
            console.log("Foto: ", `http://127.0.0.1:8000/api${professorSelecionado.foto}`);
        } else {
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
            setFoto('')
            setPreview("http://127.0.0.1:8000/api/media/fotos/default.png")
        }
    }, [professorSelecionado])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!ni || !nome || !email || !cel || !ocup || !(fotoRef.current instanceof File)) {
            setMessage("Preencha todos os campos!")
            return
        }

        const fileExtension = fotoRef.current.name.split(".").pop()
        console.log("Extensão: ", fileExtension);
        const newNameFile = `${ni}_${nome.split(" ")[0]}.${fileExtension}`
        console.log("Nome do arquivo: ", newNameFile);

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
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
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
        const file = e.target.files[0] //Faltou o "s" em files

        if (!file) return

        fotoRef.current = file

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result);
        };

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
            onClose(false)
        } catch (error) {

        }
    }

    return (
        <div className="modal-overlay">
            <div className="container_modal_t">
                <div className="head_modal_t">
                    <button className="close_button_t" onClick={onClose}>X</button>
                </div>
                <div className="body_modal_t">
                    <div className="caixa1_t">
                        <h2>{professorSelecionado ? "Editar" : "Cadastrar"}</h2>
                        <input
                            className="campo_t"
                            placeholder="NI"
                            type="text"
                            value={ni}
                            onChange={(e) => setNi(e.target.value)}
                        />
                        <input
                            className="campo_t"
                            placeholder="Nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            className="campo_t"
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="campo_t"
                            placeholder="Celular"
                            type="text"
                            value={cel}
                            onChange={(e) => setCel(e.target.value)}
                        />
                        <input
                            className="campo_t"
                            placeholder="Ocupação"
                            type="text"
                            value={ocup}
                            onChange={(e) => setOcup(e.target.value)}
                        />
                    </div>
                    <div className="foto">
                        Foto
                    </div>

                </div>

                <div
                    className="image_t"
                >
                    {preview && <img src={preview} alt="Preview" />}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                            position: 'relative',
                            top: '0px',
                            width: '150px',
                            height: '50px',
                            color: 'transparent',
                        }}
                    />
                    <div className="msg_t"
                        style={{
                            position: 'relative',
                            top: '70px',
                            left: '-160px',
                            width: '550px',
                            height: '25px',
                        }}>
                        {message}
                    </div>
                    <button
                        type="submit"
                        style={{
                            position: 'relative',
                            top: '80px',
                            left: '-160px',
                            width: '150px',
                            height: '50px',
                        }}
                        onClick={(e) => {
                            e.preventDefault()
                            professorSelecionado ? editTeacher(professorSelecionado.id) : handleSubmit(e)
                        }}
                    >
                        {professorSelecionado ? "Editar" : "Salvar"}
                    </button>
                </div>

            </div>
        </div>
    )

}

export default ModalProfessores