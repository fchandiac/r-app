import { useAppContext } from '@/appProvider'
import FolderCard from '@/components/Cards/FolderCard/FolderCard'
import useRecipients from '@/components/Hooks/useRecipients'
import { Grid, Paper, List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FolderIcon from '@mui/icons-material/Folder'
import ArticleIcon from '@mui/icons-material/Article'
import useDistributions from '@/components/Hooks/useDistributions'



export default function folders() {
    const { user, update_folders } = useAppContext()
   
    const [foldersList, setFoldersList] = useState([])
    const [foldersQuanty, setFoldersQuanty] = useState(0)
    const [totalDocuments, setTotalDocuments] = useState(0)
    const [totalCompletes, setTotalCompletes] = useState(0)
    const [totalPendings, setTotalPendings] = useState(0)

    const recipients = useRecipients()
    const distributions = useDistributions()

    useEffect(() => {
        const fetch = async () => {
            const recipients_ = await recipients.findAllByUser(user.id)
            const totalDocumentsByUser = await distributions.totalDocumentsByUser(user.id)

            const pendings = await distributions.totalPendingDocumentsByUser(user.id)
            const completes = await distributions.totalCompleteDocumentsByUser(user.id)
         
          

            setTotalDocuments(totalDocumentsByUser)
            setTotalPendings(pendings)
            setTotalCompletes(completes)
            setFoldersList(recipients_)
            setFoldersQuanty(recipients_.length)
        }
        fetch()
    }, [update_folders])



    return (
        <>
            <Paper variant={'outlined'} sx={{ padding: 1 }}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar >
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={foldersQuanty} primaryTypographyProps={{ fontWeight: 'bold', fontSize: 14 }}
                            secondary={'Carpetas'} secondaryTypographyProps={{ fontSize: 12 }} />
                        <ListItemAvatar>
                            <Avatar >
                                <ArticleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={totalDocuments} primaryTypographyProps={{ fontWeight: 'bold', fontSize: 14 }}
                            secondary={'Documentos'} secondaryTypographyProps={{ fontSize: 12 }} />

                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor:'green' }} >
                                <ArticleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={totalCompletes} primaryTypographyProps={{ fontWeight: 'bold', fontSize: 14 }}
                            secondary={'Recepcionados'} secondaryTypographyProps={{ fontSize: 12 }} />
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor:'red' }}>
                                <ArticleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={totalPendings} primaryTypographyProps={{ fontWeight: 'bold', fontSize: 14 }}
                            secondary={'Pendientes'} secondaryTypographyProps={{ fontSize: 12 }} />
                    </ListItem>
                </List>
            </Paper>
            <Grid container spacing={2} marginTop={3}>
                {foldersList.map(folder => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={folder.id}>
                        <FolderCard folder={folder} />
                    </Grid>
                ))}
            </Grid>
        </>

    )
}
