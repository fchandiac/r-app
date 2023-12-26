import { useAppContext } from '@/appProvider'
import FolderCard from '@/components/Cards/FolderCard/FolderCard'
import useRecipients from '@/components/Hooks/useRecipients'
import { Grid } from '@mui/material'
import React, {useEffect, useState} from 'react'



export default function folders() {
    const {user } = useAppContext()
    const [foldersList, setFoldersList] = useState([])

    const recipients = useRecipients()

    useEffect(() => {
        const fetch = async () => {
            const recipients_ = await recipients.findAllByUser(user.id)
            setFoldersList(recipients_)
        }
        fetch()
    }, [])



  return (
    <>
    <Grid container spacing={2}>
        {foldersList.map(folder => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={folder.id}>
                <FolderCard folder={folder}/>
            </Grid>
        ))}
    </Grid>
    </>

  )
}
