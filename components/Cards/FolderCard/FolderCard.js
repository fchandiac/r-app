import { Card, Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useDistributions from '@/components/Hooks/useDistributions'
import DistributionGrid from '@/components/Grids/DistributionsGrid/DistributionGrid'
import TransparencyGrid from '@/components/Grids/TransparencyGrid'
import { useAppContext } from '@/appProvider'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AllDistributionGrid from '@/components/Grids/AllDistributionsGrid /AllDistributionGrid'


export default function FolderCard(props) {
    const { folder } = props
    const { update_folders } = useAppContext()
    const distributions = useDistributions()
    const theme = useTheme()
    const [distributionsList, setDistributionsList] = useState([])
    const [pendings, setPendings] = useState(0)
    const [openReceptionDialog, setOpenReceptionDialog] = useState(false)
    const [updateFoler, setUpdateFolder] = useState(false)
    const [openTransparencyDialog, setOpenTransparencyDialog] = useState(false)
    const [allDocuments, setAllDocuments] = useState([])
    const [openDocumentsDialog, setOpenDocumentsDialog] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const distributions_ = await distributions.findAllByRecipient(folder.id)
            const filteredDistributions = distributions_.filter(distribution => distribution.status > 1)
            setAllDocuments(filteredDistributions)
            setDistributionsList(filteredDistributions)
            setPendings(filteredDistributions.filter(distribution => distribution.status === 2).length)

        }
        fetch()
    }, [updateFoler, update_folders])


    // id: recipient.id,
    // name: recipient.name,
    // Department: recipient.Department,
    // departmentName: recipient.Department.name,
    // departmentId: recipient.Department.id,
    // User: recipient.User,
    // userName: recipient.User.name,
    // userId: recipient.user_id,
    // repository: recipient.repository,
    // url_repository: recipient.url_repository,
    // createdAt: recipient.createdAt,





    return (
        <>
            <Card variant='outlined'>
                <Box
                    display="flex" flexDirection={'column'} justifyContent="space-between"
                    sx={{ padding: 1, backgroundColor: pendings === 0 ? '#c8e6c9' : '#ffcdd2' }}
                >


                    <Stack direction={'row'} spacing={1} alignContent={'space-between'} justifyContent={'space-between'} display={'flex'}>
                        <Box>
                            <Stack direction="column" spacing={.5}>
                                <Typography variant={'h7'}>{folder.name}</Typography>
                                <Typography variant={'caption'}>{folder.departmentName}</Typography>
                                <Typography variant={'caption'}>Nro. documentos: {distributionsList.length}</Typography>
                                <Typography variant={'caption'}>Pendientes: {pendings}</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Button 
                            disabled={allDocuments.length == 0 ? true : false} variant="outlined" size='small' startIcon={<VisibilityIcon />}
                            onClick={() => { setOpenDocumentsDialog(true) }}
                            >
                                documentos
                            </Button>
                        </Box>
                    </Stack>
                </Box>


                <Box
                    display="flex"
                    flexDirection={'row'}
                    justifyContent="right"
                    alignItems="center"
                    padding={1}

                >
                    <Button
                        sx={{ display: folder.repository ? 'inline-block' : 'none' }}
                        variant='outlined'
                        onClick={() => { setOpenTransparencyDialog(true) }}
                        size='small'
                    >Transparencía</Button>


                    <Button
                        sx={{ marginLeft: 1 }}
                        variant='contained'
                        size='small'
                        disabled={pendings === 0}
                        onClick={() => {
                            setOpenReceptionDialog(true)
                        }}
                    >Recepcionar</Button>
                </Box>
            </Card>

            <Dialog open={openReceptionDialog} maxWidth={'lg'} fullWidth onClose={() => { setOpenReceptionDialog(false) }}>
                <DialogTitle sx={{ padding: 2 }}>Recepción de documentos</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <DistributionGrid recipient_id={folder.id} updateFolder={() => { setUpdateFolder(!updateFoler) }} closeDialog={() => { setOpenReceptionDialog(false) }} />
                </DialogContent>
            </Dialog>

            <Dialog open={openTransparencyDialog} maxWidth={'xl'} fullWidth onClose={() => { setOpenTransparencyDialog(false) }}>

                <DialogTitle sx={{ padding: 2 }}>Transparencía</DialogTitle>


                <DialogContent sx={{ padding: 1 }}>
                    <TransparencyGrid recipient_id={folder.id} closeDialog={() => { setOpenTransparencyDialog(false) }} />
                    {/* <DistributionGrid recipient_id={folder.id} updateFolder={()=>{setUpdateFolder(!updateFoler)}} closeDialog={() => {setOpenReceptionDialog(false)}}/> */}
                </DialogContent>
            </Dialog>


            <Dialog open={openDocumentsDialog} maxWidth={'lg'} fullWidth onClose={() => { setOpenDocumentsDialog(false)}}>
                <DialogTitle sx={{ padding: 2 }}>Documentos en carpeta {folder.name}</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <AllDistributionGrid recipient_id={folder.id} updateFolder={() => { setUpdateFolder(!updateFoler) }} closeDialog={() => { setOpenReceptionDialog(false) }} />
                </DialogContent>
            </Dialog>
        </>
    )
}
