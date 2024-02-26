import useDistributions from '@/components/Hooks/useDistributions'
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Stack, Dialog, DialogTitle, DialogContent, Autocomplete, DialogActions, Button, TextField } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useAppContext } from '@/appProvider'
import InfoDataGrid from '@/components/Karmextron/InfoDataGrid/InfoDataGrid.js'
const config = require('../../../config.js')
const server_url = config.serverUrl
import { GridActionsCellItem } from '@mui/x-data-grid'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import useRecipients from '@/components/Hooks/useRecipients.js'





export default function DistributionGrid(props) {
    const { recipient_id, updateFolder, closeDialog } = props
    const { user, update_folders, setUpdateFolders } = useAppContext()
    const distributions = useDistributions()
    const recipients = useRecipients()
    const [distributionsList, setDistributionsList] = useState([])
    const [update, setUpdate] = useState(false)
    const [gridApiRef, setGridApiRef] = useState(null)
    const [openMoveDialog, setOpenMoveDialog] = useState(false)
    const [foldersOptions, setFoldersOptions] = useState([])
    const [rowData, setRowData] = useState({})
    const [folerToMove, setFolerToMove] = useState({id: 0, key: 0, name: ''})
    useEffect(() => {
        const fetch = async () => {
            const dist = await distributions.findAllToGrid(recipient_id)
            dist.sort((a, b) => b.folio - a.folio)
            console.log('dist To Recive ', dist)

            setDistributionsList(dist)
            if (dist.length == 0) {
                updateFolder()
                closeDialog()
            }

            const folders = await recipients.findAllByUser(user.id)
            const folersToOptions = folders.map(folder => {
                return { id: folder.id, key: folder.id, name: folder.name }
            })
            setFoldersOptions(folersToOptions)
        }
        fetch()
    }, [update])

    const openPdf = (url) => {
        const pdfUrl = server_url + 'pdfjs-4.0.269-dist/web/viewer.html?file=' + url
        window.open(pdfUrl, '_blank')
    }

    const updateStatus = async (distribution_id) => {
        await distributions.updateStatus(distribution_id, 3, user.id)
        setUpdateFolders(!update_folders)
        setUpdate(!update)
    }

    const moveToFolder = async () => {
        const move = await distributions.updateRecipient(rowData.distribution_id, folerToMove.id)         
        setUpdateFolders(!update_folders)
        setUpdate(!update)
        setFolerToMove({id: 0, key: 0, name: ''})
        setOpenMoveDialog(false)
    }

    const columns = [
        { field: 'year', headerName: 'Año', flex: .3 },
        { field: 'folio', headerName: 'Folio', flex: .4 },
        { field: 'type', headerName: 'Documento', flex: .5 },
        { field: 'matter', headerName: 'Materia', flex: 1 },
        { field: 'date', headerName: 'Fecha', flex: .5, valueFormatter: (params) => moment(params.value).format('DD-MM-YYYY') },
        {
            field: 'actions',
            headerName: '',
            headerClassName: 'data-grid-last-column-header',
            type: 'actions', flex: .7, getActions: (params) => [
                <GridActionsCellItem
                    icon={<PictureAsPdfIcon />}
                    label={'Ver'}
                    onClick={() => {
                        openPdf(params.row.url)
                    }}
                />,
                <GridActionsCellItem
                    icon={<DriveFileMoveIcon />}
                    label={'mover'}
                    onClick={() => {
                        setRowData(params.row)
                        setOpenMoveDialog(true)
                    }}
                />,
                <GridActionsCellItem
                    icon={<ArchiveIcon />}
                    label={'Recibir'}
                    onClick={() => {
                        updateStatus(params.row.distribution_id)
                    }}
                />
            ]
        }
    ]






    return (
        <>

            <InfoDataGrid
                rows={distributionsList}
                columns={columns}
                title='Recepcionar Documentos'
                height='60vh'
                setGridApiRef={setGridApiRef}
            />

            <Dialog open={openMoveDialog} onClose={() => { setOpenMoveDialog(false) }} maxWidth={'xs'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Mover Documento: {' ' + rowData.type + ' ' + rowData.folio}</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>

                    <Autocomplete
                        id="folders"
                        sx={{ paddingTop: 1 }}
                        value={folerToMove}
                        options={foldersOptions}
                        getOptionLabel={(option) => option.name}
                        onChange={async (event, newValue) => {
                            if (newValue) {
                                setFolerToMove(newValue)
                            }

                        }}
                        renderInput={(params) => <TextField {...params} label="Carpeta" fullWidth size='small' />}
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={() => { moveToFolder() }}>mover</Button>
                </DialogActions>
            </Dialog>




        </>
    )
}
