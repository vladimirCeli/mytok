import { useDropzone } from 'react-dropzone'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { uploadVideo, publishVideo } from '../../services/index.js'

export default function Upload() {
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(null)

    const onDrop = async (files) => {
        const [file] = files
        setUploading(true)
        const [error, fileUrl] = await uploadVideo({videoFile: file})
        if (error) return console.error(error)
        setUploaded(fileUrl)   
    }

    const { isDragAccept, isDragReject, getRootProps, getInputProps } = useDropzone({
        disabled: uploading || uploaded,
        maxFiles: 1,
        accept: 'video/mp4,video/x-m4v,video/*',
        onDrop
    })

    useEffect(() => {
        if (isDragReject) navigator.vibrate(100)
    }, [isDragReject])

    const dndClassNames = clsx(styles.dnd, {
        [styles.uploaded]: uploaded,
        [styles.uploading && !styles.uploaded]: uploading,
        [styles.dndReject]: isDragReject,
        [styles.dndAccept]: isDragAccept
    })

    const renderDndContent = () => {
        if (uploaded) return <h4>¡Archivo cargado con éxito!</h4>
        if (uploading) return <h4>Subiendo archivo ... </h4>
        if (isDragReject) return <h4>Archivo no soportado</h4>
        if (isDragAccept) return <h4>¡Suelta el archivo para subirlo!</h4>

        return (<>
            <h4>
                Selecciona el video para cargar
            </h4>
            <h5>
                O arrastra y suelta un archivo
            </h5>
            <ul>
                <li>MP4 o WebM</li>
                <li>Resolución de al menos 720x1280</li>
                <li>Hasta 180 segundos</li>
            </ul>
        </>
        )}

    const handleSubmit = async evt => {
        evt.preventDefault()
        if (!uploaded) return

        const description = evt.target.description.value
        const [error] = await publishVideo({videoSrc: uploaded, description})

        if (error) return console.error(error)
        else console.log('video published successfully')
    }
        
    return (
        <div className={styles.upload}>
            <h1>Cargar Video</h1>
            <p>Este video se publicará en el perfil de @vladiceli6</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div {...getRootProps()} >
                    <input {...getInputProps()} />
                    <div className={dndClassNames}>
                        <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-us/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg" width="49" />
                        {renderDndContent()}
                    </div>
                </div>

                <label>
                    Leyenda
                    <input name='description' placeholder='' />
                </label>

                <button>
                    Publicar
                </button>

            </form>

        </div>
    )
}