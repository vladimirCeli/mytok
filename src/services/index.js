import { supabase } from './supabase.js'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

export const uploadVideo = async ({videoFile}) => {
    const filename = window.crypto.randomUUID()
    const {data, error} = await supabase.storage
     .from('videos')
     .upload(`uploads/${filename}.mp4`, videoFile)

    const file = data && data?.Key ? `${prefix}${data.Key}` : ''
    return [error, file]
}

export const publishVideo = async ({videoSrc, description}) => {
    const defaultAlbum = 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/5b9c9e7d428ef8aaa00a9ddf8ab972c1~c5_720x720.jpeg?x-expires=1648141200&amp;x-signature=oB3QvF0Tie9i5GdUvtHioVkLioU%3D'
    const defaultSong = 'vladice song'
    const {data, error} = await supabase.from('videos')
     .insert([
         { 
             user_id: '72d72edb-5f1e-4613-80ef-c5690b857c06', 
             description, 
             albumCover: defaultAlbum, 
             songTitle: defaultSong, 
             src: videoSrc}
     ])

    return [error, data]
}

export const getVideos = async () => {
    const {
        data,
        error
    } = await supabase
        .from('videos')
        .select(`*, user:user_id ( avatar, username, id
            )`)
            .order('created_at', {ascending: false})

    return [error, data]
}