import React, { useState, useEffect } from 'react'
import AppDataGrid from '../../Karmextron/DataGrid/DataGrid'
import InfoDataGrid from './InfoDataGrid/InfoDataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'

import { Dialog, DialogTitle, DialogContent, Button, Grid, Stack, ButtonGroup, Typography, Stepper, Step, StepLabel, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import useDecrees from '../../Hooks/useDecrees'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import DecreesForm from '../../Forms/DecreesForm'
import moment from 'moment'
import useAttachments from '../../Hooks/useAttachments'
import useDistributions from '../../Hooks/useDistributions'






export default function DecreesGrid(props) {
    const { decreesList, updateGrid } = props
    const decrees = useDecrees()
    const attachments = useAttachments()
    const distributions = useDistributions()
    const [gridApiRef, setGridApiRef] = useState(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openNewDecreeDialog, setOpenNewDecreeDialog] = useState(false)
    const [openEditDecreeDialog, setOpenEditDecreeDialog] = useState(false)
    const [openUploadDialog, setOpenUploadDialog] = useState(false)
    const [openInfoDialog, setOpenInfoDialog] = useState(false)
    const [rowData, setRowData] = useState(rowDataDefault())
    const [update, setUpdate] = useState(false)
    const [newDecreeData, setNewDecreeData] = useState(decreeDataDefault())
    const [distributionList, setDistributionList] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const distributionList_ = await distributions.findAllByReference(0, rowData.id)
            console.log('distributionList_', distributionList_)
            setDistributionList(distributionList_)
        }
        fetch()
    }, [rowData])


    const typeName = (type) => {
        switch (type) {
            case 1:
                return 'Exento'
            case 2:
                return 'Alcaldicio'
            case 3:
                return 'Siaper'
            default:
                return ''
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: .5, hide: true },
        { field: 'typeName', headerName: 'Tipo', flex: .5 },
        { field: 'folio', headerName: 'Folio', flex: .5 },
        { field: 'matter', headerName: 'Materia', flex: 1.5 },
        { field: 'date', headerName: 'Fecha', flex: .5 },
        { field: 'categoryName', headerName: 'Categoría', flex: .5 },
        { field: 'departmentName', headerName: 'Departamento', flex: .5 },
        { field: 'userName', headerName: 'Usuario', flex: .5 },
        {
            field: 'actions',
            headerName: '',
            headerClassName: 'data-grid-last-column-header',
            type: 'actions', flex: .6, getActions: (params) => [
                <GridActionsCellItem
                    sx={{ display: params.row.attachmentUrl == '' ? 'none' : 'inline-block' }}
                    icon={<PictureAsPdfIcon />}
                    label={'Ver'}
                    onClick={() => {
                        window.open(params.row.attachmentUrl, '_blank')
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label={'Eliminar'}
                    onClick={() => {
                        setRowData({
                            rowId: params.row.id,
                            id: params.row.id,
                            type: params.row.type,
                            matter: 'Revóquese decreto ' + params.row.type.name + ' Nº ' + params.row.folio + ' con fecha ' + moment(params.row.date).format('DD-MM-YYYY') + '.',
                            date: new Date(),
                            category: { id: 1001, key: 1001, name: 'Revóquese' },
                            department: params.row.department,
                            destroyFolio: params.row.folio,
                            destroyYear: params.row.year,
                            file: null
                        })
                        setOpenDeleteDialog(true)
                    }}
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label={'Editar'}
                    onClick={() => {
                        setRowData({
                            rowId: params.row.id,
                            id: params.row.id,
                            type: params.row.type,
                            matter: 'Rectifíquese decreto ' + params.row.type.name + ' Nº ' + params.row.folio + ' con fecha ' + moment(params.row.date).format('DD-MM-YYYY') + '.',
                            date: new Date(),
                            category: { id: 1001, key: 1001, name: 'Rectifíquese' },
                            department: params.row.department,
                            destroyFolio: params.row.folio,
                            destroyYear: params.row.year,
                            file: null
                        })
                        setOpenEditDecreeDialog(true)

                    }}
                />,
                <GridActionsCellItem
                    icon={<FileUploadIcon />}
                    label={'Subir'}
                    onClick={() => {
                        setRowData({
                            rowId: params.row.id,
                            id: params.row.id,
                        })
                        setOpenUploadDialog(true)
                    }}
                />,


                <GridActionsCellItem
                    icon={<InfoIcon />}
                    label={'Ver'}
                    onClick={() => {
                        setRowData({
                            rowId: params.row.id,
                            id: params.row.id,
                            type: params.row.type,
                            typeName: params.row.typeName,
                            matter: params.row.matter,
                            date: params.row.date,
                            Attachment: params.row.Attachment,
                            attachmentId: params.row.attachmentId,
                            attachmentUrl: params.row.attachmentUrl,
                            categoryName: params.row.categoryName,
                            category: params.row.category,
                            departmentName: params.row.departmentName,
                            department: params.row.department,
                            userName: params.row.userName,
                            userId: params.row.userId,
                        })
                        setOpenInfoDialog(true)
                        console.log(params.row)
                    }}
                />

            ]

        }
    ]


    const uploadFile = async (file) => {

        let attachmentURL = ''
        if (rowData.file !== null) {
            const upload = await attachments.upload(rowData.file)
            let url = attachments.serverUrl() + upload.filename
            const newAttachment = await attachments.create(url)
            console.log('newAttachment', newAttachment)
            setRowData({ ...rowData, attachmentUrl: newAttachment.data.url, attachmentId: newAttachment.data.id })
            attachmentURL = newAttachment.data.url
            await decrees.updateAttachment(rowData.id, newAttachment.data.id)

        } else {
            console.log('no hay archivo')
        }
        console.log('attachmentURL', attachmentURL)

        gridApiRef.current.updateRows([{
            id: rowData.id,
            attachmentUrl: attachmentURL
        }])
        setOpenUploadDialog(false)

    }



    return (
        <>

            <InfoDataGrid columns={columns} rows={decreesList} height='80vh' setGridApiRef={setGridApiRef}
                newDegreeButton={<Button variant='contained' onClick={() => { setOpenNewDecreeDialog(true) }}>Nuevo decreto</Button>}
            />

            <Dialog open={openNewDecreeDialog} maxWidth={'lg'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Nuevo decreto</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>


                    <DecreesForm
                        mode={'new'}
                        onClose={() => { setOpenNewDecreeDialog(false) }}
                        afterSubmit={() => { updateGrid(); setNewDecreeData(decreeDataDefault()) }}
                        decreeData={newDecreeData}
                        setDecreeData={setNewDecreeData}

                    />

                </DialogContent>
            </Dialog>

            <Dialog open={openDeleteDialog} maxWidth={'lg'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Revóquese decreto</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>


                    <DecreesForm
                        mode={'delete'}
                        onClose={() => { setOpenDeleteDialog(false) }}
                        afterSubmit={() => { updateGrid(); setNewDecreeData(decreeDataDefault()) }}
                        decreeData={rowData}
                        setDecreeData={setRowData}

                    />

                </DialogContent>
            </Dialog>

            <Dialog open={openEditDecreeDialog} maxWidth={'lg'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Rectifíquese decreto</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>


                    <DecreesForm
                        mode={'edit'}
                        onClose={() => { setOpenEditDecreeDialog(false) }}
                        afterSubmit={() => { updateGrid(); setNewDecreeData(decreeDataDefault()) }}
                        decreeData={rowData}
                        setDecreeData={setRowData}

                    />

                </DialogContent>
            </Dialog>

            <Dialog open={openUploadDialog} maxWidth={'sm'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Subir archivo</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <form onSubmit={(e) => { e.preventDefault(); uploadFile() }}>
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item>
                                <Stack direction="row" spacing={1} alignItems="center">

                                    <ButtonGroup >
                                        <Button
                                            variant='contained'
                                            component="label"
                                            startIcon={<AttachFileIcon />}

                                        >
                                            Adjuntar
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    let file = e.target.files[0]
                                                    setRowData({ ...rowData, file: file })

                                                }}
                                                hidden
                                            />
                                        </Button>
                                        <Button
                                            variant='contained'
                                            component="label"
                                            size='small'
                                            onClick={() => {
                                                setRowData({ ...rowData, file: null })

                                            }}

                                        >
                                            <ClearIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography variant={'inherit'} component='div'>
                                        {rowData.file ? rowData.file.name : 'Seleccione un archivo'}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item textAlign={'right'}>
                                <Button variant='contained' color='primary' type='submit'>Subir</Button>
                                <Button sx={{ marginLeft: 1 }} variant='outlined' color='secondary' onClick={() => { setOpenUploadDialog(false); setRowData({ ...rowData, file: null }) }}>cerrar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openInfoDialog} maxWidth={'sm'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Información Decreto</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <Grid container spacing={1} direction={'column'}>
                        <Grid item>
                            <Stepper>
                                <Step key={0} active={true}>
                                    <StepLabel>Asignación</StepLabel>
                                </Step>
                                <Step key={0} active={rowData.attachmentUrl == '' ? false : true}>
                                    <StepLabel>Archivo Documento</StepLabel>
                                </Step>
                                <Step key={0} active={false}>
                                    <StepLabel>Distribución</StepLabel>
                                </Step>
                            </Stepper>
                        </Grid>
                        <Grid item marginTop={2}>
                            <Paper variant={'outlined'} sx={{ padding: 1 }}>
                                <Typography variant={'subtitle2'}>Distibución</Typography>
                                <List>
                                    {
                                        distributionList.map((distribution, index) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <SendIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={distribution.Recipient.name} secondary="en proceso" />
                                            </ListItem>


                                        ))
                                    }

                                </List>
                            </Paper>
                        </Grid>
                        <Grid item textAlign={'right'}>
                            {/* <Button variant='contained' color='primary' type='submit'>Subir</Button> */}
                            <Button sx={{ marginLeft: 1 }} variant='outlined' color='secondary' onClick={() => { setOpenInfoDialog(false) }}>cerrar</Button>
                        </Grid>
                    </Grid>



                </DialogContent>
            </Dialog>


        </>



    )
}


function rowDataDefault() {
    return ({
        rowId: 0,
        id: 0,
        type: 0,
        matter: '',
        date: '',
        Attachment: '',
        attachmentId: '',
        attachmentUrl: '',
        categoryName: '',
        departmentName: '',
        userName: '',
        userId: '',
        referenceId: 0,
    })
}

function decreeDataDefault() {
    return ({
        id: 0,
        date: new Date(),
        matter: '',
        type: { id: 0, key: 0, name: '' },
        category: { id: 0, key: 0, name: '' },
        department: { id: 0, key: 0, name: '' },
        userId: 0,
        file: null
    })
}