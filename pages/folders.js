import { useAppContext } from '@/appProvider'
import FolderCard from '@/components/Cards/FolderCard/FolderCard'
import useRecipients from '@/components/Hooks/useRecipients'
import { Grid, Paper, List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FolderIcon from '@mui/icons-material/Folder'
import ArticleIcon from '@mui/icons-material/Article'
import useDistributions from '@/components/Hooks/useDistributions'
import useDepartments from '@/components/Hooks/useDepartments'
import RecipientsForm from '@/components/Forms/RecipientsForm'




export default function folders() {
    const { user, update_folders } = useAppContext()
    const [foldersList, setFoldersList] = useState([])
    const [foldersQuanty, setFoldersQuanty] = useState(0)
    const [totalDocuments, setTotalDocuments] = useState(0)
    const [totalCompletes, setTotalCompletes] = useState(0)
    const [totalPendings, setTotalPendings] = useState(0)
    const [openNewfolderDialog, setOpenNewfolderDialog] = useState(false)
    


    const recipients = useRecipients()
    const distributions = useDistributions()
    const [recipientData, setRecipientData] = useState(recipients.dataDefault())

    useEffect(() => {
        const fetch = async () => {
            const recipients_ = await recipients.findAllByUser(user.id)

            console.log('recipients_', recipients_)
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

    const newFolder = async () => {
        console.log('user', user)
    }






    return (
        <>
            <Paper variant={'outlined'} sx={{ padding: 1 }}>
                <Button variant={'contained'} color={'primary'} onClick={() => { setOpenNewfolderDialog(true) }}>Nueva Carpeta</Button>
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
                            <Avatar sx={{ backgroundColor: 'green' }} >
                                <ArticleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={totalCompletes} primaryTypographyProps={{ fontWeight: 'bold', fontSize: 14 }}
                            secondary={'Recepcionados'} secondaryTypographyProps={{ fontSize: 12 }} />
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'red' }}>
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

            <Dialog open={openNewfolderDialog} maxWidth={'xs'} fullWidth onClose={() => { setOpenNewfolderDialog(false) }}>
                <DialogTitle sx={{ padding: 2 }}>Nueva Carpeta</DialogTitle>
                <form onSubmit={(e) => { e.preventDefault(); newFolder() }}>
                    <DialogContent sx={{ padding: 1 }}>
                        <RecipientsForm
                            afterSubmit={() => { setOpenNewfolderDialog(false) }}
                            edit={false}
                            closeDialog={() => { setOpenNewfolderDialog(false) }}
                            recipientData={recipientData}
                            setRecipientdata={setRecipientData}
                        
                        />
                    </DialogContent>
                </form>
            </Dialog>
        </>

    )
}
